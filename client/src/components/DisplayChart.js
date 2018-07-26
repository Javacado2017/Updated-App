import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const styles = {
  card: {
    maxWidth: 500
  },
  media: {
    height: 0,
    paddingTop: "56.25%" // 16:9
  },
  root: {
    justifyContent: "center"
  }
};

function SimpleMediaCard(props) {
  const { classes } = props;
  return (
    <div>
      <Card className={classes.card}>
        <CardMedia
          className={classes.media}
          image="data:image/png;base64,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"
          title="Chart"
        />
        <CardContent>
          <Typography
            gutterBottom
            align="center"
            variant="headline"
            component="h2"
          >
            CHARTS
          </Typography>
          <Typography align="center" component="p3">
            Monthly Data
          </Typography>
        </CardContent>
        <CardActions classes={{ root: classes.root }}>
          <Button size="small" color="primary">
            BTC
          </Button>
          <Button size="small" color="primary">
            BCH
          </Button>
          <Button size="small" color="primary">
            ETH
          </Button>
          <Button size="small" color="primary">
            LTC
          </Button>
        </CardActions>
      </Card>
    </div>
  );
}

SimpleMediaCard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SimpleMediaCard);