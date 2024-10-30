import useTypewriter from "@/hooks/useTypewriter";

interface TypewriterProps {
    text: string;
    speed?: number; // Make speed optional with a default value
    className?: string;
  }
  
const Typewriter: React.FC<TypewriterProps> = ({text, speed, className}) => {
    const displayText = useTypewriter(text, speed);
  
    return <div> <p className={className}>{displayText}</p></div>
  };
  
  export default Typewriter;