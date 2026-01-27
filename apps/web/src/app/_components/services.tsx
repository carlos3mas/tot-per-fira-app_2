
export function Services() {
  return (
    <section className="relative overflow-hidden border border-b-0 border-t-0 border-gray-300 container mx-auto">
      <div className="container mx-auto">
        <div className="p-4 border-b border-gray-300 text-center bg-[var(--complementary-color-pink)]/10">
          <h2 className="text-4xl md:text-8xl font-bold font-khand text-[var(--primary-color)]">¿QUÉ HACEMOS POR TI?</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="p-4 border-b md:border-r border-gray-300">
            <ServiceCard step="01" title="Recibimos tu pedido" description="Una vez recibimos el fórmulario con tu pedido, te contactaremos para confirmar los detalles." />
          </div>
          <div className="p-4 border-b border-gray-300">
            <ServiceCard step="02" stepColor="text-[var(--complementary-color-green)]" title="Buscamos la mejor solución" description="Con el pedido confirmado, buscamos la mejor solución para ti, con el mejor precio y te enviamos el presupuesto." />
          </div>
          <div className="p-4 border-b md:border-r border-gray-300">
            <ServiceCard step="03" stepColor="text-[var(--complementary-color-turquoise)]" title="Entregamos y montamos" description="Si todo está bien y aceptas el presupuesto, te lo entregamos y montamos donde y cuando quieras." />
          </div>
          <div className="p-4 border-b border-gray-300">
            <ServiceCard step="04" stepColor="text-[var(--complementary-color-pink)]" title="Recogemos y desmontamos" description="Si has solicitado algún producto de alquiler, lo desmontamos y lo recogemos en el punto que nos indiques." />
          </div>
        </div>
      </div>
    </section>
  )
}

function ServiceCard({
  step,
  title,
  description,
  stepColor = "text-[var(--primary-color)]",
  titleColor = "text-[var(--secondary-color)]",
  descriptionColor = "text-gray-600"
}: {
  step: string,
  title: string,
  description: string,
  stepColor?: string,
  titleColor?: string,
  descriptionColor?: string
}) {
  return (
    <div className="p-4 border-gray-300">
      <span className={`text-2xl font-bold font-khand ${stepColor} block`}>{step}.</span>
      <h3 className={`text-3xl md:text-5xl font-bold font-khand ${titleColor}`}>{title}</h3>
      <p className={descriptionColor}>{description}</p>
    </div>
  )
}
