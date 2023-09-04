import { Avatar, Box, Button, Card, Flex, Link, Text } from "@radix-ui/themes";
import { useAuthContext } from "../../context/AuthContext/useAuthContext";
import { signOut } from "../../service/AuthServices";
import { useNavigate } from "react-router-dom";

export default function UserProfileCard() {
  const { user } = useAuthContext();
  console.log(user);

  const navigate = useNavigate();

  function logOut() {
    signOut();
    navigate("/login");
  }

  return (
    <Card
      style={{
        justifySelf: "end",
        border: "1px solid var(--jade-a5)",
        margin: "100% .5rem 0",
      }}
    >
      <Flex gap="3" align="center">
        <Avatar
          size="3"
          src={user?.user_metadata.avatar_url.toString()}
          fallback={user?.email?.charAt(0) ?? ""}
          style={{ borderRadius: "100%" }}
        />
        <Box>
          <Text as="div" size="2" weight="bold">
            {user?.user_metadata.full_name ?? user?.email}
          </Text>
          <Button
            variant="ghost"
            color="tomato"
            style={{ marginTop: ".05rem" }}
            onClick={logOut}
          >
            Sair
          </Button>
        </Box>
      </Flex>
    </Card>
  );
}
