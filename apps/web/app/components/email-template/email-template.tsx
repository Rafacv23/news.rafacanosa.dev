import * as React from "react"
import {
  Html,
  Head,
  Preview,
  Body,
  Container,
  Section,
  Heading,
  Text,
  Img,
  Link,
  Hr,
} from "@react-email/components"

export default function WelcomeEmail() {
  return (
    <Html>
      <Head />
      <Preview>🎉 Bienvenido a la newsletter de news.rafacanosa.dev</Preview>
      <Body style={main}>
        <Container style={container}>
          {/* Welcome Message */}
          <Section style={section}>
            <Heading as="h2" style={title}>
              ¡Bienvenido a bordo! 🎉
            </Heading>
            <Text style={text}>
              Gracias por suscribirte a la newsletter de{" "}
              <Link href="https://news.rafacanosa.dev" style={link}>
                news.rafacanosa.dev
              </Link>
              .
            </Text>
            <Text style={text}>
              Aquí recibirás cada semana artículos sobre videojuegos, cine,
              libros, tecnología y cultura digital, sin spam, solo contenido que
              realmente vale la pena leer.
            </Text>
            <Text style={text}>
              Mientras esperas la próxima edición, puedes visitar la web y
              explorar las últimas publicaciones:
            </Text>
            <Link href="https://news.rafacanosa.dev" style={button}>
              Ir al sitio →
            </Link>
          </Section>

          <Hr style={hr} />

          {/* Closing */}
          <Section style={section}>
            <Text style={text}>
              Gracias por unirte,
              <br />– Rafa Canosa
            </Text>
          </Section>

          {/* Footer */}
          <Section style={footer}>
            <Text style={footerText}>
              © {new Date().getFullYear()} news.rafacanosa.dev · Estás
              recibiendo este email porque te has suscrito a la newsletter.
            </Text>
            <Text style={footerText}>
              Si no deseas recibir más correos, puedes{" "}
              <Link href="https://news.rafacanosa.dev/manage" style={link}>
                darte de baja aquí
              </Link>
              .
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  )
}

/* === Styles === */
const main = {
  backgroundColor: "#fdfdfc",
  fontFamily: "sans-serif",
}

const container = {
  margin: "0 auto",
  padding: "20px",
  maxWidth: "600px",
}

const header = {
  textAlign: "center" as const,
  padding: "20px 0",
}

const logo = {
  fontSize: "24px",
  fontWeight: "bold",
}

const section = {
  marginBottom: "30px",
}

const title = {
  fontSize: "22px",
  fontWeight: "600",
  margin: "16px 0 8px",
  color: "#21201c",
}

const text = {
  fontSize: "14px",
  lineHeight: "20px",
  color: "#030712a7",
}

const button = {
  display: "inline-block",
  padding: "10px 16px",
  backgroundColor: "#21201c",
  color: "#fdfdfc",
  borderRadius: "0.5rem",
  textDecoration: "none",
  fontWeight: "600",
  marginTop: "16px",
}

const link = {
  color: "#21201c",
  textDecoration: "none",
  fontWeight: "600",
}

const hr = {
  border: "none",
  borderTop: "1px solid #f5f4f4",
  margin: "30px 0",
}

const footer = {
  textAlign: "center" as const,
  fontSize: "12px",
  color: "#030712a7",
  marginTop: "20px",
}

const footerText = {
  margin: "4px 0",
}
