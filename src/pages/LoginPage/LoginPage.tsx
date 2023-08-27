import {
  Box,
  Button,
  Flex,
  Grid,
  Heading,
  Link,
  Text,
  TextFieldInput,
} from "@radix-ui/themes";
import { ChangeEvent, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { styles } from "./LoginPageStyles";
import HeroImg from "../../assets/login-hero.svg";

export default function LoginPage() {
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [isSignUp, setIsSignUp] = useState(false);

  const isSmallScreen = useMediaQuery({
    query: "(max-width: 800px)",
  });

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setFormValues((prev) => ({ ...prev, [e.target?.name]: e.target.value }));
  }

  return (
    <Flex
      style={
        styles[isSmallScreen ? "pageContainerMobile" : "pageContainerDesktop"]
      }
      justify={`${isSmallScreen ? "center" : "start"}`}
      align="start"
    >
      <Flex
        direction="column"
        gap="3"
        style={
          styles[isSmallScreen ? "formContainerMobile" : "formContainerDesktop"]
        }
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
      {!isSmallScreen && (
        <Grid style={styles.desktopHero} width="100%">
          <img src={HeroImg} style={styles.heroImg} />
        </Grid>
      )}
    </Flex>
  );
}
