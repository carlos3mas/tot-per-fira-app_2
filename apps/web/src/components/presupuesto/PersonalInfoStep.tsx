"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { type Presupuesto } from "@/types/presupuesto";

interface PersonalInfoStepProps {
  form: any;
  presupuesto: Presupuesto;
  onUpdate: (data: Partial<Presupuesto>) => void;
}

export default function PersonalInfoStep({ form, presupuesto, onUpdate }: PersonalInfoStepProps) {
  return (
    <div className="p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        <div>
          <form.Field name="nombreCompleto">
            {(field: any) => (
              <div className="space-y-3">
                <Label 
                  htmlFor={field.name}
                  className="text-[var(--secondary-color)] font-clash-display font-bold text-base md:text-lg"
                >
                  Nombre Completo *
                </Label>
                <Input
                  id={field.name}
                  name={field.name}
                  value={presupuesto.nombreCompleto}
                  onBlur={field.handleBlur}
                  onChange={(e) => {
                    field.handleChange(e.target.value);
                    onUpdate({ nombreCompleto: e.target.value });
                  }}
                  placeholder="Introduce tu nombre"
                  className="h-12 border-2 border-[#000000] shadow-[2px_2px_0px_0px_#000000] font-clash-display p-3 focus:outline-none focus:shadow-none focus:translate-x-[2px] focus:translate-y-[2px] transition-all rounded-none text-base"
                  autoComplete="name"
                />
                {field.state.meta.errors.map((error: any) => (
                  <p key={error?.message} className="text-red-600 text-sm font-clash-display border-2 border-red-600 bg-red-50 p-2 rounded-none">
                    {error?.message}
                  </p>
                ))}
              </div>
            )}
          </form.Field>
        </div>

        <div>
          <form.Field name="nombrePenya">
            {(field: any) => (
              <div className="space-y-3">
                <Label 
                  htmlFor={field.name}
                  className="text-[var(--secondary-color)] font-clash-display font-bold text-base md:text-lg"
                >
                  Nombre de la Organización, Peña o Grupo
                </Label>
                <Input
                  id={field.name}
                  name={field.name}
                  value={presupuesto.nombrePenya || ""}
                  onBlur={field.handleBlur}
                  onChange={(e) => {
                    field.handleChange(e.target.value);
                    onUpdate({ nombrePenya: e.target.value });
                  }}
                  placeholder="Nombre de tu organización, peña o grupo (opcional)"
                  className="h-12 border-2 border-[#000000] shadow-[2px_2px_0px_0px_#000000] font-clash-display p-3 focus:outline-none focus:shadow-none focus:translate-x-[2px] focus:translate-y-[2px] transition-all rounded-none text-base"
                />
                {field.state.meta.errors.map((error: any) => (
                  <p key={error?.message} className="text-red-600 text-sm font-clash-display border-2 border-red-600 bg-red-50 p-2 rounded-none">
                    {error?.message}
                  </p>
                ))}
              </div>
            )}
          </form.Field>
        </div>

        <div>
          <form.Field name="direccion">
            {(field: any) => (
              <div className="space-y-3">
                <Label 
                  htmlFor={field.name}
                  className="text-[var(--secondary-color)] font-clash-display font-bold text-base md:text-lg"
                >
                  Dirección de Entrega *
                </Label>
                <Input
                  id={field.name}
                  name={field.name}
                  value={presupuesto.direccion}
                  onBlur={field.handleBlur}
                  onChange={(e) => {
                    field.handleChange(e.target.value);
                    onUpdate({ direccion: e.target.value });
                  }}
                  placeholder="Se puede modificar sin problemas"
                  className="h-12 border-2 border-[#000000] shadow-[2px_2px_0px_0px_#000000] font-clash-display p-3 focus:outline-none focus:shadow-none focus:translate-x-[2px] focus:translate-y-[2px] transition-all rounded-none text-base"
                  autoComplete="address-line1"
                />
                {field.state.meta.errors.map((error: any) => (
                  <p key={error?.message} className="text-red-600 text-sm font-clash-display border-2 border-red-600 bg-red-50 p-2 rounded-none">
                    {error?.message}
                  </p>
                ))}
              </div>
            )}
          </form.Field>
        </div>

        <div>
          <form.Field name="correoElectronico">
            {(field: any) => (
              <div className="space-y-3">
                <Label 
                  htmlFor={field.name}
                  className="text-[var(--secondary-color)] font-clash-display font-bold text-base md:text-lg"
                >
                  Correo Electrónico *
                </Label>
                <Input
                  id={field.name}
                  name={field.name}
                  type="email"
                  value={presupuesto.correoElectronico}
                  onBlur={field.handleBlur}
                  onChange={(e) => {
                    field.handleChange(e.target.value);
                    onUpdate({ correoElectronico: e.target.value });
                  }}
                  placeholder="ejemplo@correo.com"
                  className="h-12 border-2 border-[#000000] shadow-[2px_2px_0px_0px_#000000] font-clash-display p-3 focus:outline-none focus:shadow-none focus:translate-x-[2px] focus:translate-y-[2px] transition-all rounded-none text-base"
                  autoComplete="email"
                />
                {field.state.meta.errors.map((error: any) => (
                  <p key={error?.message} className="text-red-600 text-sm font-clash-display border-2 border-red-600 bg-red-50 p-2 rounded-none">
                    {error?.message}
                  </p>
                ))}
              </div>
            )}
          </form.Field>
        </div>

        <div>
          <form.Field name="numeroTelefono">
            {(field: any) => (
              <div className="space-y-3">
                <Label 
                  htmlFor={field.name}
                  className="text-[var(--secondary-color)] font-clash-display font-bold text-base md:text-lg"
                >
                  Número de Teléfono *
                </Label>
                <Input
                  id={field.name}
                  name={field.name}
                  type="tel"
                  value={presupuesto.numeroTelefono}
                  onBlur={field.handleBlur}
                  onChange={(e) => {
                    field.handleChange(e.target.value);
                    onUpdate({ numeroTelefono: e.target.value });
                  }}
                  placeholder="123456789"
                  className="h-12 border-2 border-[#000000] shadow-[2px_2px_0px_0px_#000000] font-clash-display p-3 focus:outline-none focus:shadow-none focus:translate-x-[2px] focus:translate-y-[2px] transition-all rounded-none text-base"
                  autoComplete="tel"
                />
                {field.state.meta.errors.map((error: any) => (
                  <p key={error?.message} className="text-red-600 text-sm font-clash-display border-2 border-red-600 bg-red-50 p-2 rounded-none">
                    {error?.message}
                  </p>
                ))}
              </div>
            )}
          </form.Field>
        </div>

        <div>
          <form.Field name="segundoNumeroTelefono">
            {(field: any) => (
              <div className="space-y-3">
                <Label 
                  htmlFor={field.name}
                  className="text-[var(--secondary-color)] font-clash-display font-bold text-base md:text-lg"
                >
                  Segundo Número de Teléfono
                </Label>
                <Input
                  id={field.name}
                  name={field.name}
                  type="tel"
                  value={presupuesto.segundoNumeroTelefono || ""}
                  onBlur={field.handleBlur}
                  onChange={(e) => {
                    field.handleChange(e.target.value);
                    onUpdate({ segundoNumeroTelefono: e.target.value });
                  }}
                  placeholder="Segundo número (opcional)"
                  className="h-12 border-2 border-[#000000] shadow-[2px_2px_0px_0px_#000000] font-clash-display p-3 focus:outline-none focus:shadow-none focus:translate-x-[2px] focus:translate-y-[2px] transition-all rounded-none text-base"
                  autoComplete="tel"
                />
                {field.state.meta.errors.map((error: any) => (
                  <p key={error?.message} className="text-red-600 text-sm font-clash-display border-2 border-red-600 bg-red-50 p-2 rounded-none">
                    {error?.message}
                  </p>
                ))}
              </div>
            )}
          </form.Field>
        </div>
      </div>
    </div>
  );
}