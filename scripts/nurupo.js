export default ( robot => {
  robot.hear(/ぬるぽ/, msg => {
    msg.send("ガッ")
  });
});
