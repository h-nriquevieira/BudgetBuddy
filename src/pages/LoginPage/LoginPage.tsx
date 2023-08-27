import {
  Box,
  Button,
  Flex,
  Heading,
  Link,
  Text,
  TextFieldInput,
} from "@radix-ui/themes";
import { ChangeEvent, useState } from "react";

export default function LoginPage() {
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [isSignUp, setIsSignUp] = useState(false);

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setFormValues((prev) => ({ ...prev, [e.target?.name]: e.target.value }));
  }

  return (
    <Flex
      style={{
        width: "100%",
        minHeight: "100vh",
        paddingTop: "2rem",
        backgroundColor: "var(--accent-9)",
      }}
      justify="center"
      align="start"
    >
      <Flex
        direction="column"
        gap="3"
        style={{
          maxWidth: "max(85%, 300px)",
          minHeight: "100%",
          backgroundColor: "var(--accent-9-contrast)",
          padding: "4rem 1.75rem",
          borderRadius: "max(var(--radius-2), var(--radius-full))",
        }}
      >
        <Heading
          color="jade"
          size="7"
          align="center"
          style={{ marginBottom: "1.5rem" }}
        >
          BudgetBuddy
        </Heading>
        <Box style={{ marginBottom: "1rem" }}>
          <Heading as="h2" size="4">
            Acesso ao app
          </Heading>
          <Text size="2">
            Por favor, faça o login ou crie sua conta para continuar.
          </Text>
        </Box>
        <TextFieldInput
          placeholder="E-mail"
          name="email"
          value={formValues.email}
          onChange={handleChange}
        />
        <TextFieldInput
          placeholder="Senha"
          type="password"
          name="password"
          value={formValues.password}
          onChange={handleChange}
        />
        {isSignUp && (
          <TextFieldInput
            placeholder="Confirme sua senha"
            type="password"
            name="confirmPassword"
            value={formValues.confirmPassword}
            onChange={handleChange}
          />
        )}
        <Button style={{ cursor: "pointer" }}>Entrar</Button>
        <Button style={{ cursor: "pointer" }}>Usar conta demo</Button>
        <Button style={{ cursor: "pointer" }} variant="outline">
          Entrar com Google
        </Button>
        {isSignUp ? (
          <Text>
            Já tem uma conta?{" "}
            <Link onClick={() => setIsSignUp(false)}>Faça o login.</Link>
          </Text>
        ) : (
          <Text>
            Primeira vez aqui?{" "}
            <Link onClick={() => setIsSignUp(true)}>Crie sua conta.</Link>
          </Text>
        )}
      </Flex>
    </Flex>
  );
}
