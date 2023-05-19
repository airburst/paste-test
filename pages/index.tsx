import Head from "next/head";
import { Heading } from "@twilio-paste/core/heading";
import { Box } from "@twilio-paste/core/box";
import { useUIDSeed } from "@twilio-paste/core/uid-library";
import type { NextPage } from "next";
import {
  Form,
  FormControl,
  Label,
  Select,
  Option,
  Input,
  RadioGroup,
  Radio,
  FormActions,
  Button,
  List,
  ListItem,
  Text,
} from "@twilio-paste/core";

const Home: NextPage = () => {
  const seed = useUIDSeed();
  return (
    <Box as="main" padding="space70">
      <Head>
        <title>Paste NextJS App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Form aria-labelledby={seed("your-details")}>
        <Heading
          as="h3"
          variant="heading30"
          id={seed("your-details")}
          marginBottom="space0"
        >
          Your details
        </Heading>
        <FormControl>
          <Label htmlFor={seed("title")}>Title</Label>
          <Select id={seed("title")} name="title">
            <Option value="">Please select</Option>
            <Option value="Mr">Mr</Option>
            <Option value="Mrs">Mrs</Option>
            <Option value="Miss">Miss</Option>
            <Option value="Ms">Ms</Option>
            <Option value="Dr">Dr</Option>
            <Option value="Mx">Mx</Option>
          </Select>
        </FormControl>
        <FormControl>
          <Label htmlFor={seed("first-name")}>First name</Label>
          <Input type="text" id={seed("first-name")} name="first-name" />
        </FormControl>
        <FormControl>
          <Label htmlFor={seed("last-name")}>Last name</Label>
          <Input type="text" id={seed("last-name")} name="last-name" />
        </FormControl>
        <Heading as="h3" variant="heading30" marginBottom="space0">
          Please choose the covers you need
        </Heading>
        <Text as="p">
          <strong>Public / Product Liability</strong>
        </Text>
        <Text as="p">
          Public liability insurance protects you if you injure someone or
          damage their property in the course of running your business.
        </Text>
        <Text as="p">This does not include cover for:</Text>
        <List as="ul">
          <ListItem>Customer's goods in your care</ListItem>
          <ListItem>Damage caused by, or to, your motor vehicle</ListItem>
          <ListItem>
            Damage to an item being worked on, unless otherwise stated in your
            policy documents
          </ListItem>
        </List>
        <Text as="p">
          Product liability insurance protects you if you sell a product that
          injures someone or damages their property.
        </Text>
        <FormControl>
          <RadioGroup
            legend="Address implementation"
            name="address-implementation"
          >
            <Radio value="2000000">£2,000,000</Radio>
            <Radio value="5000000">£5,000,000</Radio>
          </RadioGroup>
        </FormControl>
        <FormActions>
          <Button variant="primary">Submit</Button>
          <Button variant="secondary">Cancel</Button>
        </FormActions>
      </Form>
    </Box>
  );
};

export default Home;
