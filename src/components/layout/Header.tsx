"use client";
import Image from "next/image";
import Link from "next/link";

import React, { useEffect, useRef, useState } from "react";
import {
  Toolbar,
  IconButton,
  Stack,
  Chip,
  AppBar,
  Box,
  ListItem,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Drawer,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import LuggageIcon from "@mui/icons-material/Luggage";

const navItems: NavBarItem[] = [
  {
    title: "Explore",
    href: "asdf",
    icon: <LuggageIcon />,
    isActive: true,
  },
  {
    title: "Flights",
    href: "asdf",
    icon: <LuggageIcon />,
    isActive: false,
  },
  {
    title: "Hotels",
    href: "asdf",
    icon: <LuggageIcon />,
    isActive: false,
  },
];

import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
export default function Header() {
  const [open, setOpen] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  // 🧠 Detect click outside
  useEffect(() => {
    if (!open) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (
        drawerRef.current &&
        !drawerRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  const DrawerList = (
    <Box ref={drawerRef} sx={{ width: 250 }} role="presentation">
      <List>
        {["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {["All mail", "Trash", "Spam"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      <AppBar
        elevation={0}
        sx={{
          backgroundColor: "#fff",
          borderBottom: "1px solid #e0e0e0",
        }}
      >
        <Toolbar sx={{ justifyContent: "start", gap: 2 }}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={toggleDrawer(true)}
          >
            <MenuIcon sx={{ color: "#6a6a6a" }} />
          </IconButton>

          <Link href="/" style={{ display: "flex", alignItems: "center" }}>
            <Box sx={{ width: 74, height: 24, position: "relative" }}>
              <Image
                src="/images/logo.svg"
                alt="Logo"
                fill
                style={{ objectFit: "contain" }}
                priority
              />
            </Box>
          </Link>

          <Stack direction="row" spacing={2}>
            {navItems.map((item, index) => (
              <Chip
                key={index}
                label={item.title}
                clickable
                size="medium"
                variant="outlined"
                icon={<LuggageIcon color="primary" fontSize={"small"} />}
                sx={{
                  borderRadius: 25,
                  fontSize: "14px",
                  fontWeight: "500",
                  px: "5px",
                  py: "20px",
                  "&:hover": {
                    backgroundColor: "#f1f3f4",
                  },
                }}
              />
            ))}
          </Stack>
        </Toolbar>
      </AppBar>

      <Drawer
        open={open}
        onClose={toggleDrawer(false)}
        sx={{
          mt: 8,
        }}
        ModalProps={{ hideBackdrop: true }}
      >
        {DrawerList}
      </Drawer>
    </>
  );
}
