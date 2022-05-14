import { FC, ReactNode, useMemo } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { motion, AnimatePresence } from "framer-motion";

const RightSidebar: FC<{
  showRightSidebar: boolean;
  setShowRightSidebar: any;
  children: ReactNode;
}> = ({ setShowRightSidebar, showRightSidebar, children }) => {
  const variants = useMemo(
    () => ({
      open: { opacity: 1, x: 0 },
      closed: { opacity: 0, x: "100%" },
    }),
    []
  );

  return (
    <AnimatePresence>
      <motion.div
        layout
        initial="closed"
        animate={showRightSidebar ? "open" : "closed"}
        transition={{ duration: 0.6, type: "spring" }}
        variants={variants}
        className="absolute top-0 bottom-0 right-0 z-10 h-full w-[30%] bg-primary p-8 shadow-lg"
        exit={{ opacity: 0 }}
      >
        <div>
          <AiOutlineCloseCircle
            className="ml-auto cursor-pointer text-3xl text-white"
            onClick={() => setShowRightSidebar(false)}
          />
          {children}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default RightSidebar;
