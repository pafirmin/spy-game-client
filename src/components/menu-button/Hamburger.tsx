import { motion } from "framer-motion";
import React from "react";

const Path = (props: any) => (
  <motion.path
    fill="transparent"
    strokeWidth="3"
    stroke="hsl(0, 0%, 18%)"
    strokeLinecap="round"
    {...props}
  />
);

const Hamburger = () => {
  return (
    <svg width="23" height="23" viewBox="0 0 23 23">
      <Path
        variants={{
          closed: { d: "M 0 3 L 23 3" },
          open: { d: "M 3 3 L 20 20" },
        }}
      />
      <Path
        d="M 0 11.5 L 23 11.5"
        variants={{
          closed: { opacity: 1 },
          open: { opacity: 0 },
        }}
        transition={{ duration: 0.1 }}
      />
      <Path
        variants={{
          closed: { d: "M 0 20 L 23 20" },
          open: { d: "M 3 20 L 20 3" },
        }}
      />
    </svg>
  );
};

export default Hamburger;
