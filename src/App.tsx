export default function App() {
  return (
    <main className="min-h-screen grid place-items-center">
      <div className="container-film py-24">
        <p className="label-mono">design system online</p>
        <h1 className="display mt-6 text-6xl">
          A system that boots into a story
          <span className="cursor-block" aria-hidden="true" />
        </h1>
        <p className="mt-6 font-mono text-sm text-dim">
          $ ./saksham --init <span className="stamp-ok">[ok]</span>
        </p>
      </div>
      <div className="grain" aria-hidden="true" />
    </main>
  )
}
