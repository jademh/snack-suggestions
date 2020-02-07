import styled from "styled-components";

import Header from "./Header";

const Wrapper = styled.div`
  margin: 20px;
  background: hotpink;
`;

const Layout = props => (
  <Wrapper>
    <Header />
    {props.children}
  </Wrapper>
);

export default Layout;
