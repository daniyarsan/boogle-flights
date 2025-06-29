import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Collapse from "@mui/material/Collapse";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Box, Stack } from "@mui/material";
import Image from "next/image";
import { FlightItem } from "@/types";

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  console.log(expand);
  return <IconButton {...other} />;
})(({ theme }) => ({
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
  variants: [
    {
      props: ({ expand }) => !expand,
      style: {
        transform: "rotate(0deg)",
      },
    },
    {
      props: ({ expand }) => !!expand,
      style: {
        transform: "rotate(180deg)",
      },
    },
  ],
}));

export default function FlightCard({ item }: { item: FlightItem }) {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  console.log(item);

  return (
    <Card
      sx={{
        px: 2,
        py: 1,
      }}
    >
      <Stack
        direction="row"
        justifyContent={"space-between"}
        spacing={2}
        alignItems="center"
      >
        <Box>
          <Image
            width={50}
            height={50}
            src={"/images/pegasus.png"}
            alt="pegasus"
          />
        </Box>
        <Stack direction={"column"}>
          <Box>
            <Typography sx={{ fontSize: "16px", fontWeight: "semi-bold" }}>
              05:35 – 17:40
            </Typography>
          </Box>
          <Box>
            <Typography
              sx={{
                fontSize: "12px",
                fontWeight: "normal",
                color: "#70757a",
              }}
            >
              Pegasus Airlines
            </Typography>
          </Box>
        </Stack>
        <Stack direction={"column"}>
          <Box>
            <Typography sx={{ fontSize: "16px", fontWeight: "semi-bold" }}>
              9 ч. 35 мин.
            </Typography>
          </Box>
          <Box>
            <Typography
              sx={{
                fontSize: "12px",
                fontWeight: "normal",
                color: "#70757a",
              }}
            >
              FRU–AYT
            </Typography>
          </Box>
        </Stack>
        <Stack direction={"column"}>
          <Box>
            <Typography sx={{ fontSize: "16px", fontWeight: "semi-bold" }}>
              1 пересадка
            </Typography>
          </Box>
          <Box>
            <Typography
              sx={{
                fontSize: "12px",
                fontWeight: "normal",
                color: "#70757a",
              }}
            >
              2 ч. 30 мин.
            </Typography>
          </Box>
        </Stack>
        <Stack direction={"column"}>
          <Box>
            <Typography sx={{ fontSize: "16px", fontWeight: "semi-bold" }}>
              82 089 KGS
            </Typography>
          </Box>
          <Box>
            <Typography
              sx={{
                fontSize: "12px",
                fontWeight: "normal",
                color: "#70757a",
              }}
            >
              туда и обратно
            </Typography>
          </Box>
        </Stack>
        <Stack>
          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </ExpandMore>
        </Stack>
      </Stack>

      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography sx={{ marginBottom: 2 }}>Method:</Typography>
          <Typography sx={{ marginBottom: 2 }}>
            Heat 1/2 cup of the broth in a pot until simmering, add saffron and
            set aside for 10 minutes.
          </Typography>
          <Typography sx={{ marginBottom: 2 }}>
            Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet
            over medium-high heat. Add chicken, shrimp and chorizo, and cook,
            stirring occasionally until lightly browned, 6 to 8 minutes.
            Transfer shrimp to a large plate and set aside, leaving chicken and
            chorizo in the pan. Add pimentón, bay leaves, garlic, tomatoes,
            onion, salt and pepper, and cook, stirring often until thickened and
            fragrant, about 10 minutes. Add saffron broth and remaining 4 1/2
            cups chicken broth; bring to a boil.
          </Typography>
          <Typography sx={{ marginBottom: 2 }}>
            Add rice and stir very gently to distribute. Top with artichokes and
            peppers, and cook without stirring, until most of the liquid is
            absorbed, 15 to 18 minutes. Reduce heat to medium-low, add reserved
            shrimp and mussels, tucking them down into the rice, and cook again
            without stirring, until mussels have opened and rice is just tender,
            5 to 7 minutes more. (Discard any mussels that don&apos;t open.)
          </Typography>
          <Typography>
            Set aside off of the heat to let rest for 10 minutes, and then
            serve.
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}
