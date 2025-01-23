import {motion} from "framer-motion";


export default function Shapes(color, size, top, left, delay) {
  return (
      <motion.div className={`absolute rounded-full ${color} ${size} opacity-20 blur-xl`} //Position the shapes

style = {{ top, left}}
    
 animate={{
        y: ["0%", "1005", "0%"],
        x: ["0%", "1005", "0%"],
        rotate: [0, 360],
    }}//Animate the shapes

    transition={{
        duration: 15,
        ease: "easeInOut",
        times: [0, 0.5, 1],
        loop: Infinity,
        delay: delay,
    }} //Delay the animation

    aria-hidden="true" //Not visible/accesible to screen readers
/>
  )
}
