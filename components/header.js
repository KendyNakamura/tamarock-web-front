import React, { useState } from "react";
import utilStyles from "../styles/utils.module.css";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";
import Link from "next/link";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  topIcon: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function PrimarySearchAppBar() {
  const classes = useStyles();

  const [query, setQuery] = useState("");

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Link href="/">
            <a>
              <img
                src="/images/profile.jpg"
                className={`${utilStyles.headerImage} ${utilStyles.borderCircle} ${classes.topIcon}`}
                alt="TopImage"
              />
            </a>
          </Link>
          <Typography variant="h6" className={classes.title}>
            <Link href="/">
              <a>Artists</a>
            </Link>
          </Typography>
          <Button color="inherit">
            <InputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
              onChange={(e) => setQuery(e.target.value)}
              value={query}
            />
          </Button>
          {query ? (
            <Link
              href={{ pathname: "/search", query: { name: encodeURI(query) } }}
            >
              <a>
                <SearchIcon />
              </a>
            </Link>
          ) : (
            <SearchIcon />
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}
