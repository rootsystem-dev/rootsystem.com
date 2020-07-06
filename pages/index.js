export default () => {
  return (
    <>
      <div className="root">root<span>system</span></div>
      <style>{`
        .root {
          color: #24272B;
          font-family: ui-sans-serif, system-ui;
          font-size: 2.4em;
          font-weight: 100;
          letter-spacing: 0.25em;
          margin: 0 auto;
          padding-top: 25%;
          text-align: center;
        }
        .root > span {
          color: #1C6B5D;
        }
      `}</style>
    </>
  )
}

