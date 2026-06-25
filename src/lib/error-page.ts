export function renderErrorPage(): string {
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Something went wrong</title>
    <style>
        body {
            margin: 0;
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            background: #0a0a0a;
            color: #f5f5f5;
            font-family: "Inter", system-ui, sans-serif;
        }
        .container { text-align: center; max-width: 400px; padding: 2rem; }
        h1 { font-size: 1.25rem; font-weight: 600; margin: 0 0 0.5rem; }
        p { font-size: 0.875rem; color: #6b6b6b; margin: 0 0 1.5rem; }
        a {
            display: inline-block;
            padding: 0.5rem 1rem;
            background: #ff3d2e;
            color: #fff;
            text-decoration: none;
            border-radius: 4px;
            font-size: 0.875rem;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Something went wrong</h1>
        <p>An unexpected error occurred. Please try refreshing the page.</p>
        <a href="/">Go home</a>
    </div>
</body>
</html>`;
}
