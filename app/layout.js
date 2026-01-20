import './globals.css';

export const metadata = {
  title: 'Project Management - Vibe Coders',
  description: 'A minimal dark mode project management app with Kanban board, todos, and notes',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
