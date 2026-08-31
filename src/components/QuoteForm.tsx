import { useEffect, useState } from 'react';
import { ArrowRight, CheckCircle2, Loader2, AlertCircle } from 'lucide-react';
import { supabase, type QuoteRequest } from '../lib/supabase';
import { services } from '../data/content';

interface QuoteFormProps {
  defaultService?: string;
  compact?: boolean;
}

type Status = 'idle' | 'loading' | 'success' | 'error';

const serviceOptions = services.map((s) => s.name);

export function QuoteForm({ defaultService, compact = false }: QuoteFormProps) {
  const [form, setForm] = useState<QuoteRequest>({
    name: '',
    email: '',
    phone: '',
    company: '',
    service: defaultService ?? services[0].name,
    message: '',
  });
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState<string>('');

  useEffect(() => {
    if (defaultService) setForm((f) => ({ ...f, service: defaultService }));
  }, [defaultService]);

  const update = (key: keyof QuoteRequest, value: string) =>
    setForm((f) => ({ ...f, [key]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.service.trim()) {
      setStatus('error');
      setError('Preencha nome, e-mail e o serviço desejado.');
      return;
    }
    setStatus('loading');
    setError('');
    try {
      const { error: insertError } = await supabase
        .from('quote_requests')
        .insert({
          name: form.name.trim(),
          email: form.email.trim(),
          phone: form.phone?.trim() || null,
          company: form.company?.trim() || null,
          service: form.service,
          message: form.message?.trim() || null,
        });
      if (insertError) throw insertError;
      setStatus('success');
    } catch (err) {
      setStatus('error');
      setError(
        err instanceof Error
          ? `Não foi possível enviar: ${err.message}`
          : 'Não foi possível enviar sua solicitação. Tente novamente.'
      );
    }
  };

  if (status === 'success') {
    return (
      <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-steel-200 bg-steel-50 p-8 text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-steel-500 text-white">
          <CheckCircle2 className="h-7 w-7" />
        </div>
        <h3 className="text-xl font-bold text-ink-900">Solicitação recebida</h3>
        <p className="max-w-sm text-sm text-ink-500">
          Obrigado, {form.name.split(' ')[0]}. Nossa equipe de engenharia
          entrará em contato em até 1 dia útil com uma proposta técnica
          preliminar.
        </p>
        <button
          onClick={() => {
            setForm({
              name: '',
              email: '',
              phone: '',
              company: '',
              service: defaultService ?? services[0].name,
              message: '',
            });
            setStatus('idle');
          }}
          className="btn-ghost mt-2"
        >
          Enviar nova solicitação
        </button>
      </div>
    );
  }

  const inputBase =
    'w-full rounded-xl border border-ink-200 bg-white px-4 py-3 text-sm text-ink-900 placeholder:text-ink-400 transition focus:border-steel-400 focus:outline-none focus:ring-2 focus:ring-steel-200';

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      {!compact && (
        <div>
          <h3 className="text-lg font-bold text-ink-900">
            Solicite um orçamento técnico
          </h3>
          <p className="mt-1 text-sm text-ink-500">
            Preencha os dados abaixo. Resposta em até 1 dia útil.
          </p>
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-xs font-semibold text-ink-600">
            Nome completo *
          </label>
          <input
            type="text"
            required
            value={form.name}
            onChange={(e) => update('name', e.target.value)}
            className={inputBase}
            placeholder="Seu nome"
          />
        </div>
        <div>
          <label className="mb-1.5 block text-xs font-semibold text-ink-600">
            Empresa
          </label>
          <input
            type="text"
            value={form.company ?? ''}
            onChange={(e) => update('company', e.target.value)}
            className={inputBase}
            placeholder="Nome da empresa"
          />
        </div>
        <div>
          <label className="mb-1.5 block text-xs font-semibold text-ink-600">
            E-mail *
          </label>
          <input
            type="email"
            required
            value={form.email}
            onChange={(e) => update('email', e.target.value)}
            className={inputBase}
            placeholder="voce@empresa.com"
          />
        </div>
        <div>
          <label className="mb-1.5 block text-xs font-semibold text-ink-600">
            Telefone
          </label>
          <input
            type="tel"
            value={form.phone ?? ''}
            onChange={(e) => update('phone', e.target.value)}
            className={inputBase}
            placeholder="(11) 90000-0000"
          />
        </div>
      </div>

      <div>
        <label className="mb-1.5 block text-xs font-semibold text-ink-600">
          Serviço de interesse *
        </label>
        <select
          value={form.service}
          onChange={(e) => update('service', e.target.value)}
          className={inputBase}
        >
          {serviceOptions.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
          <option value="Outro">Outro / Não sei ainda</option>
        </select>
      </div>

      <div>
        <label className="mb-1.5 block text-xs font-semibold text-ink-600">
          Detalhes do projeto
        </label>
        <textarea
          value={form.message ?? ''}
          onChange={(e) => update('message', e.target.value)}
          rows={compact ? 3 : 4}
          className={inputBase + ' resize-none'}
          placeholder="Conte-nos sobre dimensões, prazo, local da obra, etc."
        />
      </div>

      {status === 'error' && (
        <div className="flex items-start gap-2 rounded-xl border border-ember-200 bg-ember-50 px-4 py-3 text-sm text-ember-800">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <button
        type="submit"
        disabled={status === 'loading'}
        className="btn-primary w-full sm:w-auto"
      >
        {status === 'loading' ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Enviando…
          </>
        ) : (
          <>
            Enviar solicitação
            <ArrowRight className="h-4 w-4" />
          </>
        )}
      </button>
      <p className="text-xs text-ink-400">
        Seus dados são usados apenas para responder a esta solicitação.
      </p>
    </form>
  );
}
