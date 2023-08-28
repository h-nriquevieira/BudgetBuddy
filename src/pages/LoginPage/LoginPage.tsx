import {
  Box,
  Button,
  Callout,
  Flex,
  Grid,
  Heading,
  Link,
  Text,
  TextFieldInput,
} from "@radix-ui/themes";
import { ChangeEvent, useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { styles } from "./LoginPageStyles";
import HeroImg from "../../assets/login-hero.svg";
import {
  signInWithEmail,
  signInWithGoogle,
  signUpWithEmail,
  translateErrorMessage,
} from "../../service/AuthServices";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { useNavigate } from "react-router";
import { useAuthContext } from "../../context/AuthContext/useAuthContext";

export default function LoginPage() {
  const navigate = useNavigate();

  const { session } = useAuthContext();

  useEffect(() => {
    if (session) {
      navigate("/app/dashboard");
    }
  }, [session]);

  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [isSignUp, setIsSignUp] = useState(false);
  const [error, setError] = useState("");

  const isSmallScreen = useMediaQuery({
    query: "(max-width: 800px)",
  });

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setFormValues((prev) => ({ ...prev, [e.target?.name]: e.target.value }));
  }

  function validateInputs() {
    if (!formValues.email) {
      return "Preencha o campo e-mail";
    }
    if (!formValues.password) {
      return "Preencha o campo senha";
    }
    if (isSignUp && !formValues.confirmPassword) {
      return "Confirme sua senha";
    }
    if (isSignUp && formValues.password !== formValues.confirmPassword) {
      return "As senhas não são iguais";
    }
    return "";
  }

  async function handleSignIn() {
    const validateResponse = validateInputs();
    if (validateResponse) {
      setError(validateResponse);
      return;
    }
    const res = await signInWithEmail(formValues.email, formValues.password);

    if (res.error) {
      setError(translateErrorMessage(res.error.message));
      return;
    }

    navigate("/app/dashboard");
  }

  async function handleSignUp() {
    const validateResponse = validateInputs();
    if (validateResponse) {
      setError(validateResponse);
      return;
    }

    const res = await signUpWithEmail(formValues.email, formValues.password);

    if (res.error) {
      setError(translateErrorMessage(res.error.message));
      return;
    }

    navigate("/app/dashboard");
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
          required
          placeholder="E-mail"
          name="email"
          type="email"
          value={formValues.email}
          onChange={handleChange}
        />
        <TextFieldInput
          required
          placeholder="Senha"
          type="password"
          name="password"
          value={formValues.password}
          onChange={handleChange}
        />
        {isSignUp && (
          <TextFieldInput
            required={isSignUp}
            placeholder="Confirme sua senha"
            type="password"
            name="confirmPassword"
            value={formValues.confirmPassword}
            onChange={handleChange}
          />
        )}
        {error && (
          <Callout.Root color="red" role="alert">
            <Callout.Icon>
              <ExclamationTriangleIcon />
            </Callout.Icon>
            <Callout.Text>{error}</Callout.Text>
          </Callout.Root>
        )}
        <Button
          style={{ cursor: "pointer" }}
          onClick={isSignUp ? handleSignUp : handleSignIn}
        >
          {isSignUp ? "Cadastrar" : "Entrar"}
        </Button>
        <Button style={{ cursor: "pointer" }} onClick={handleSignUp}>
          Usar conta demo
        </Button>
        <Button
          style={{ cursor: "pointer" }}
          onClick={signInWithGoogle}
          variant="outline"
        >
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
