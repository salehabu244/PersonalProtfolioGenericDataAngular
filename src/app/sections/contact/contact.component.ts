import { Component, inject, signal } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import emailjs from '@emailjs/browser';
import { RevealDirective } from '../../shared/reveal.directive';
import { SectionHeadComponent } from '../../shared/section-head.component';
import { PROFILE, EMAILJS, FORMSUBMIT } from '../../core/portfolio.data';

type SubmitState = 'idle' | 'sending' | 'sent' | 'error';
type Delivery = 'emailjs' | 'formsubmit' | 'mailto';
type FormKey = 'name' | 'email' | 'subject' | 'message';

const EMAILJS_READY = Boolean(
  EMAILJS.serviceId && EMAILJS.templateId && EMAILJS.publicKey,
);

/** FormSubmit replies with `success` as a *string* ("true"/"false"), not a boolean. */
interface FormSubmitResponse {
  readonly success?: boolean | string;
  readonly message?: string;
}

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [ReactiveFormsModule, RevealDirective, SectionHeadComponent],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
})
export class ContactComponent {
  private readonly fb = inject(FormBuilder);

  readonly profile = PROFILE;
  readonly state = signal<SubmitState>('idle');

  /** Which backend will actually transmit the message. */
  readonly delivery: Delivery = EMAILJS_READY
    ? 'emailjs'
    : FORMSUBMIT.enabled
      ? 'formsubmit'
      : 'mailto';

  /** True when the message goes to a server rather than the visitor's mail app. */
  readonly serverSide = this.delivery !== 'mailto';

  readonly form = this.fb.nonNullable.group({
    name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(80)]],
    email: ['', [Validators.required, Validators.email]],
    subject: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(120)]],
    message: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(2000)]],
  });

  get f() {
    return this.form.controls;
  }

  errorFor(control: FormKey, message: string): string | null {
    const c = this.form.controls[control];
    return c.invalid && (c.dirty || c.touched) ? message : null;
  }

  async submit(): Promise<void> {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.state.set('sending');
    const { name, email, subject, message } = this.form.getRawValue();

    try {
      if (this.delivery === 'emailjs') {
        await emailjs.send(
          EMAILJS.serviceId,
          EMAILJS.templateId,
          {
            from_name: name,
            reply_to: email,
            subject,
            message,
            to_email: this.profile.email,
          },
          {
            publicKey: EMAILJS.publicKey,
            limitRate: { id: 'portfolio-contact', throttle: 15 },
          },
        );
      } else if (this.delivery === 'formsubmit') {
        await this.sendViaFormSubmit(name, email, subject, message);
      } else {
        // Not configured: hand off to the visitor's mail client.
        window.location.href = this.mailtoHref(name, email, subject, message);
        await new Promise((resolve) => setTimeout(resolve, 400));
      }

      this.state.set('sent');
      this.form.reset({ name: '', email: '', subject: '', message: '' });
    } catch (err) {
      // Surface the real cause to whoever is testing the form; the visitor
      // sees a neutral message plus a direct mailto: fallback below.
      console.error('[contact] delivery failed:', err);
      this.state.set('error');
    }
  }

  retry(): void {
    this.state.set('idle');
  }

  private async sendViaFormSubmit(
    name: string,
    email: string,
    subject: string,
    message: string,
  ): Promise<void> {
    const endpoint = `https://formsubmit.co/ajax/${encodeURIComponent(this.profile.email)}`;

    const res = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        name,
        email,
        _replyto: email,
        _subject: subject,
        message,
      }),
    });

    let body: FormSubmitResponse | null = null;
    try {
      body = (await res.json()) as FormSubmitResponse;
    } catch {
      // Non-JSON response — treated as a failure below.
    }

    const accepted =
      res.ok && body?.success !== undefined && String(body.success).toLowerCase() === 'true';

    if (!accepted) {
      throw new Error(body?.message ?? `FormSubmit responded with HTTP ${res.status}`);
    }
  }

  private mailtoHref(name: string, email: string, subject: string, message: string): string {
    const body = `${message}\n\n—\n${name}\n${email}`;
    return (
      `mailto:${this.profile.email}` +
      `?subject=${encodeURIComponent(subject)}` +
      `&body=${encodeURIComponent(body)}`
    );
  }
}
