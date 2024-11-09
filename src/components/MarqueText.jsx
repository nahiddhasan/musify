const MarqueeText = ({ text, speed = 10 }) => {
  return (
    <div className="overflow-hidden w-full">
      <div className="marquee flex" style={{ animationDuration: `${speed}s` }}>
        <p className="mr-4">{text}</p>
        {/* <p className="mr-4">{text}</p> */}
      </div>
    </div>
  );
};

export default MarqueeText;
