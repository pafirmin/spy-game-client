import { motion } from "framer-motion";
import useStyles from "./menu-button.styles";
import Hamburger from "./Hamburger";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { toggleDrawers } from "../../features/layout/layout.slice";

const MenuButton = () => {
  const dispatch = useDispatch();
  const { openDrawers } = useSelector((state: RootState) => state.layout);
  const classes = useStyles();

  const handleClick = () => {
    dispatch(toggleDrawers());
  };

  return (
    <motion.div animate={openDrawers ? "open" : "closed"}>
      <button className={classes.button} onClick={handleClick}>
        <Hamburger />
      </button>
    </motion.div>
  );
};

export default MenuButton;
