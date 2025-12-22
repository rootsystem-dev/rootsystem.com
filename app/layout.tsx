import { Container, Footer, Header } from '@/components/elements'
import { Provider } from '@/components/ui/provider'
import '@/styles/globals.css'
import { Box, Flex } from '@chakra-ui/react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Root System',
  description: 'We help startup founders de-risk their product/technology by designing & building high-quality software and high-functioning engineering organizations.',
  openGraph: {
    title: 'Root System',
    description: 'We help startup founders de-risk their product/technology by designing & building high-quality software and high-functioning engineering organizations.',
    siteName: 'Root System',
    locale: 'en_US',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <script
          dangerouslySetInnerHTML={{
            __html: `!function () {
                      var reb2b = window.reb2b = window.reb2b || [];
                      if (reb2b.invoked) return;
                      reb2b.invoked = true;
                      reb2b.methods = ["identify", "collect"];
                      reb2b.factory = function (method) {
                        return function () {
                          var args = Array.prototype.slice.call(arguments);
                          args.unshift(method);
                          reb2b.push(args);
                          return reb2b;
                        };
                      };
                      for (var i = 0; i < reb2b.methods.length; i++) {
                        var key = reb2b.methods[i];
                        reb2b[key] = reb2b.factory(key);
                      }
                      reb2b.load = function (key) {
                        var script = document.createElement("script");
                        script.type = "text/javascript";
                        script.async = true;
                        script.src = "https://s3-us-west-2.amazonaws.com/b2bjsstore/b/" + key + "/reb2b.js.gz";
                        var first = document.getElementsByTagName("script")[0];
                        first.parentNode.insertBefore(script, first);
                      };
                      reb2b.SNIPPET_VERSION = "1.0.1";
                      reb2b.load("RGNLKQHL3L6Q");
                    }();`,
          }}
        />
        <Provider>
          <Container>
            <Flex direction="column" minHeight="100vh">
              <Header />
              <Box flex={1}>
                {children}
              </Box>
              <Footer />
            </Flex>
          </Container>
        </Provider>
      </body>
    </html>
  )
}
