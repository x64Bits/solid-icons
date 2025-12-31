import { Box, Flex, Text } from "~/components/Common/styles";
import Layout from "~/components/Layout";
import { ContentLayout } from "~/components/Layout/styles";
import { NoFoundContainer } from "./styles";

export default function NoFound() {
  return (
    <div>
      <Layout title="404">
        <ContentLayout>
          <NoFoundContainer justify="center" items="center">
            <Box mr="0.5em">
              <Text weight="bold" size="2em" color="textPrimary">
                404
              </Text>{" "}
            </Box>
            <Box mr="0.5em">
              <Text size="2em" color="textPrimary" weight="light">
                |
              </Text>
            </Box>
            <Text weight="300" size="2em" color="textPrimary">
              This page could not be found.
            </Text>
          </NoFoundContainer>
        </ContentLayout>
      </Layout>
    </div>
  );
}
