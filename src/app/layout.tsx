import Header from "@/components/layout/Header";
import { Container, CssBaseline, ThemeProvider } from "@mui/material";
import { googleSans, theme } from "@/theme";
import { RootProviders } from "@/providers/RootProviders";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <CssBaseline />
      <body className={googleSans.variable}>
        <RootProviders>
          <ThemeProvider theme={theme}>
            <Header />
            <Container>{children}</Container>
          </ThemeProvider>
        </RootProviders>
      </body>
    </html>
  );
}
