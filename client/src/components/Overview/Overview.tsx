import UserOverview from "./UserOverview";
import { Container } from "reactstrap";
import UsersOverview from "./UsersOverview";

function Overview() {
  return (
    <>
      <Container
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          marginTop: "40px",
        }}>
        <UsersOverview/>
        <UserOverview />
      </Container>
    </>
  );
}

export default Overview;
