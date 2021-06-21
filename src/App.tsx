import {Container} from "@material-ui/core";

import NavBar from "./components/NavBar";
import Content from "./components/Content";
import Alert from "./components/Alert";

function App() {

  return (
    <Container id="App" maxWidth={false} data-testid="App">
      <NavBar />
      <Content />
      <Alert />
    </Container>
  );
}

export default App;

