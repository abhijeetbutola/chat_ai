export default function Home() {
  return (
    <>
      <div className="text-primary text-2xl">Landing page</div>
      <div className="debug-text text-2xl">
        This should be red regardless of Tailwind
      </div>
      <div className="text-[#4338ca] text-2xl">
        This should be the same color as primary
      </div>
      <button className="btn-primary">Click Me</button>
      <br />
      <div className="bg-background text-foreground">
        <h1 className="text-primary-foreground">Hello World</h1>
        <button className="bg-primary text-primary-foreground">Click me</button>
      </div>
      <br />
      <br />
      <br />
      <div className="p-6 bg-background text-foreground">
        <h1 className="text-2xl font-bold">Theme Test</h1>
        <div className="mt-4 space-y-4">
          <div className="p-4 bg-primary text-primary-foreground rounded-md">
            Primary Color Block
          </div>
          <div className="p-4 bg-secondary text-secondary-foreground rounded-md">
            Secondary Color Block
          </div>
          <div className="p-4 bg-accent text-accent-foreground rounded-md">
            Accent Color Block
          </div>
          <div className="p-4 bg-muted text-muted-foreground rounded-md">
            Muted Color Block
          </div>
          <div className="p-4 bg-destructive text-destructive-foreground rounded-md">
            Destructive Color Block
          </div>
          <div className="p-4 border-2 border-border rounded-md">
            Border Example
          </div>
          <p className="text-primary">
            This uses your custom text-primary color
          </p>
        </div>
      </div>
    </>
  );
}
