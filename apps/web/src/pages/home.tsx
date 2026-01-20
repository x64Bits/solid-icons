import { AiFillHeart } from "solid-icons/ai";
import { SiPnpm, SiYarn, SiNpm } from "solid-icons/si";
import { Show, onMount, useContext } from "solid-js";
import Gradient from "~/assets/Gradient";
import Code from "~/components/Code";
import { Box, Flex, Row, Text } from "~/components/Common/styles";
import Layout from "~/components/Layout";
import { ContentLayout } from "~/components/Layout/styles";
import RecentlySearched from "~/components/RecentlySearched";
import Searchbar from "~/components/Searchbar";
import { AppContext } from "~/store/AppContext";
import {
  ContentContainer,
  ContentDescription,
  ContentMain,
  ContentTitle,
  GradientContainer,
  InformationBox,
  SearchbarContent,
  SearchbarWrapper,
} from "./home.styles";

const installSamples = [
  { title: "yarn", content: "yarn add solid-icons", icon: <SiYarn /> },
  { title: "npm", content: "npm install solid-icons", icon: <SiNpm /> },
  { title: "pnpm", content: "pnpm install solid-icons", icon: <SiPnpm /> },
];

const basicUseSample = [
  {
    title: "yarn",
    content: ` import { BiCompass } from 'solid-icons/bi'

  function MyComponent() {
      return (
          <div>
              <BiCompass size={24} color="#000000" />
              <p>SolidJS App</p>
          </div>
      )
  }`,
  },
];

const RELEASE_DATE = new Date("2026-01-20");

function isWithinDays(numDays: number): boolean {
  const now = new Date();
  const expirationDate = new Date(RELEASE_DATE);
  expirationDate.setDate(expirationDate.getDate() + numDays);

  return now < expirationDate;
}

export default function Home() {
  const [_state, { setVisibleNavSearch }] = useContext(AppContext);
  onMount(() => {
    setVisibleNavSearch(false);
  });

  return (
    <div>
      <Layout title="Home">
        <ContentLayout>
          <ContentMain>
            <GradientContainer>
              <Gradient width="100%" />
            </GradientContainer>
            <ContentContainer>
              <Box px="1em">
                <Show when={isWithinDays(30)}>
                  <Box mb="2rem">
                    <Flex justify="center">
                      <InformationBox>
                        <a
                          href="https://www.npmjs.com/package/solid-icons"
                          target="_blank"
                        >
                          Version <b>1.2.0</b> adds Material Design Icons and
                          more icons
                        </a>
                      </InformationBox>
                    </Flex>
                  </Box>
                </Show>
                <ContentTitle>Solid Icons</ContentTitle>
                <ContentDescription>
                  A collection of <b>17</b> open source icon libraries packed
                  into one for easy use in your SolidJS project with over{" "}
                  <b>35797</b> icons.
                </ContentDescription>
                <SearchbarContent>
                  <SearchbarWrapper>
                    <Searchbar autofocus={true} />
                    <RecentlySearched />
                  </SearchbarWrapper>
                </SearchbarContent>
                <Box mt="3em">
                  <Text>Let's start by installing the library</Text>
                </Box>
                <Code samples={installSamples} lang="bash" header locs />
                <Box mt="3em">
                  <Text>Basic use</Text>
                </Box>
                <Code samples={basicUseSample} lang="jsx" header locs />
              </Box>
            </ContentContainer>
          </ContentMain>
          <Box mb="2em">
            <Flex justify="center">
              <Text color="textSecondary">
                <Row>
                  Designed with{" "}
                  <Box mx="0.25em">
                    <AiFillHeart />
                  </Box>{" "}
                  by{" "}
                  <Text color="accent">
                    <Box mx="0.25em">
                      <a
                        href="https://www.linkedin.com/in/maite-sojo"
                        target="_blank"
                      >
                        Maite Sojo
                      </a>
                    </Box>
                  </Text>
                </Row>
              </Text>
            </Flex>
          </Box>
        </ContentLayout>
      </Layout>
    </div>
  );
}
