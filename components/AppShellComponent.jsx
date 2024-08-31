"use client";
import { AppShell, Burger, Group, UnstyledButton } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
// import { MantineLogo } from "@mantinex/mantine-logo";
import classes from "./MobileNavbar.module.css";
import Link from "next/link";

export function AppShellComponent({ children }) {
  const [opened, { toggle }] = useDisclosure();

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 300,
        breakpoint: "sm",
        collapsed: { desktop: true, mobile: !opened },
      }}
      padding="md"
    >
      <AppShell.Header style={{ backgroundColor: "black" }}>
        <Group h="100%" px="md">
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
          <Group justify="space-between" style={{ flex: 1 }}>
            {/* <MantineLogo size={30} /> */}
            <Link href="/" passHref>
              <UnstyledButton
                className={classes.control}
                style={{ color: "white" }}
              >
                Sarathi
              </UnstyledButton>
            </Link>
            <Group ml="xl" gap={20} visibleFrom="sm">
              <Link href="/calendar" passHref>
                <UnstyledButton
                  className={classes.control}
                  style={{ color: "white" }}
                >
                  Calendar
                </UnstyledButton>
              </Link>
              <Link href="/chat" passHref>
                <UnstyledButton
                  className={classes.control}
                  style={{ color: "white" }}
                >
                  Chat
                </UnstyledButton>
              </Link>
              <UnstyledButton
                className={classes.control}
                style={{ color: "white" }}
              >
                Contacts
              </UnstyledButton>
              <UnstyledButton
                className={classes.control}
                style={{ color: "white" }}
              >
                Support
              </UnstyledButton>
            </Group>
          </Group>
        </Group>
      </AppShell.Header>

      <AppShell.Navbar py="md" px={4}>
        <Link href="/calendar" passHref>
          <UnstyledButton className={classes.control}>Calendar</UnstyledButton>
        </Link>
        <Link href="/chat" passHref>
          <UnstyledButton className={classes.control}>Chat</UnstyledButton>
        </Link>
        <UnstyledButton className={classes.control}>Contacts</UnstyledButton>
        <UnstyledButton className={classes.control}>Support</UnstyledButton>
      </AppShell.Navbar>

      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
}
