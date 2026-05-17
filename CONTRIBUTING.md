# Contributing to KaamAsaan

First off, thank you for considering contributing to KaamAsaan! 🎉

## How Can I Contribute?

### 🐛 Reporting Bugs

Before creating bug reports, please check the existing issues to avoid duplicates.

When creating a bug report, include:
- **Clear title** describing the issue
- **Steps to reproduce** the behavior
- **Expected behavior** vs actual behavior
- **Screenshots** if applicable
- **Environment**: OS, browser, Node.js version

### 💡 Suggesting Features

Feature requests are welcome! Please:
- Use a clear and descriptive title
- Provide a detailed description of the proposed feature
- Explain why this feature would be useful
- Include mockups or examples if possible

### 🔧 Pull Requests

1. **Fork the repo** and create your branch from `main`
2. **Make your changes** with clear, descriptive commits
3. **Test your changes** thoroughly
4. **Update documentation** if needed
5. **Submit a pull request** with a clear description

#### PR Guidelines
- Follow the existing code style
- Write meaningful commit messages
- Keep PRs focused on a single feature/fix
- Update tests if applicable
- Add screenshots for UI changes

## Development Setup

```bash
# Clone your fork
git clone https://github.com/YOUR_USERNAME/KaamAsaan.git
cd KaamAsaan

# Install dependencies
npm install

# Set up environment variables
cp .env.local.example .env.local
# Edit .env.local with your API keys

# Run development server
npm run dev
```

## Code Style

- **TypeScript**: Use strict typing, avoid `any`
- **Components**: Functional components with hooks
- **Naming**: camelCase for variables, PascalCase for components
- **Formatting**: Prettier (run `npm run format`)
- **Linting**: ESLint (run `npm run lint`)

## Commit Messages

Follow conventional commits:
- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation changes
- `style:` Code style changes (formatting)
- `refactor:` Code refactoring
- `test:` Adding tests
- `chore:` Maintenance tasks

Example: `feat: add email export to CSV`

## Priority Areas

We especially welcome contributions in:
- [ ] **Testing**: Jest, React Testing Library
- [ ] **Security**: Input validation, rate limiting
- [ ] **Documentation**: API docs, tutorials
- [ ] **Accessibility**: ARIA labels, keyboard navigation
- [ ] **Performance**: Optimization, caching
- [ ] **Internationalization**: More languages

## Questions?

Feel free to open a discussion or reach out to the maintainers.

Thank you for contributing! 🚀
