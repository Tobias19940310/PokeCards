import {Container} from "@material-ui/core";

import NavBar from "./components/NavBar";
import Content from "./components/Content";

function App() {

  return (
    <Container id="App" maxWidth={false} data-testid="App">
      <NavBar />
      <Content />
    </Container>
  );
}

export default App;

