Use this template to review a PR diff for the Project Management app with focused, actionable feedback.

## INPUTS

- PR diff - the pull request diff to review
- (optional) PR description
- (optional) Ticket links

## INSTRUCTIONS

1. Scan the PR diff for correctness, style, security, and performance.
2. Ground comments in the project context:
   - Next.js 14+ App Router patterns
   - Zustand store usage and localStorage persistence
   - Tailwind CSS custom theme adherence
   - React client component patterns
   - Drag-and-drop implementation (@hello-pangea/dnd)
3. Prefer specific inline suggestions with minimal working patches.
4. Flag test gaps and missing docs. Propose concrete test cases.
5. Label severity: Blocker, Major, Minor, Nit.
6. Keep lines ≤80 chars.

## PROJECT-SPECIFIC CHECKS

**Next.js App Router:**
- [ ] Client components have `'use client'` directive
- [ ] No mixing of server/client component patterns incorrectly
- [ ] Absolute imports use `@/` alias
- [ ] No hydration mismatches (check useHydration usage)

**Zustand Stores:**
- [ ] Store actions update state immutably
- [ ] localStorage keys use `pm-` prefix
- [ ] No direct localStorage access (use stores only)
- [ ] Persist middleware configured correctly

**Tailwind & Styling:**
- [ ] Uses custom theme colors (no arbitrary color values)
- [ ] Responsive design with mobile-first `md:` breakpoints
- [ ] No inline styles or CSS-in-JS
- [ ] Custom utilities in globals.css only

**React Patterns:**
- [ ] Functional components with hooks only
- [ ] Controlled forms with local state
- [ ] Debounced saves for frequently changing inputs
- [ ] No prop drilling (use Zustand for shared state)

## OUTPUT FORMAT

### Summary
- **Scope:**
- **Impact:**
- **Risk level:**

### Positives
- **Code quality wins:**
- **Good patterns:**
- **Tests/documentation:**

### Issues by Severity

#### Blockers
- [file:line] Problem → Why it matters → Fix suggestion
  ```
  // patchlet
  ```

#### Major
- ...

#### Minor
- ...

#### Nits
- ...

### Security & Compliance
- **Input validation/injection prevention:**
- **localStorage security (no sensitive data):**
- **XSS prevention in user-generated content:**
- **Client-side data sanitization:**
- **Dependency vulnerabilities:**

### Performance
- **Unnecessary re-renders:**
- **localStorage read/write frequency:**
- **Debouncing/throttling for frequent updates:**
- **Bundle size (check large dependencies):**
- **Drag-and-drop performance with large lists:**

### Testing Gaps
- **Unit:**
- **Integration/e2e:**
- **Property/fuzz:**
- **Load/reliability:**

### Documentation
- **Changelog:**
- **Architecture notes:**
- **README/code comments:**

### Inline Review
- [file path]
  - line X: comment
  - line Y: comment

### Review Checklist
- [ ] `npm run build` succeeds
- [ ] `npm run lint` passes
- [ ] No console errors in browser
- [ ] Tests updated/added (if applicable)
- [ ] Backward compatible with existing localStorage data
- [ ] Responsive on mobile and desktop
- [ ] Brutalist theme consistency maintained
- [ ] CLAUDE.md updated if architecture changes