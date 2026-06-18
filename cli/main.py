import typer

app = typer.Typer(name="help cli", add_completion=True, invoke_without_command=True)

@app.callback()
def callback(ctx: typer.Context)
