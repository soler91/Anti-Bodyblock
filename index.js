module.exports = function antiBodyBlock(bigmeme) {
  const partyMembers = new Set();
  const cache = Object.create(null);
  const partyObj = Object.create(null);
  
  let interval = null;
  let enabled = true;

  partyObj.unk4 = 1;

  const removeBodyBlock = () => {
    for (let i = partyMembers.values(), step; !(step = i.next()).done; ) {
      partyObj.leader = step.value;
      partyObj.unk1   = cache.unk1;
      partyObj.unk2   = cache.unk2;
      partyObj.unk3   = cache.unk3;
      bigmeme.send("S_PARTY_INFO", 1, partyObj);
    }
  };
  
  bigmeme.game.on('enter_game', () => {
    if (enabled) {
      interval = bigmeme.setInterval(removeBodyBlock, 5000);
    }
  });

  bigmeme.command.add("bb", () => {
    enabled = !enabled;
    if (enabled) {
      interval = bigmeme.setInterval(removeBodyBlock, 5000);
    }
    else {
      bigmeme.clearInterval(interval);
    }
    bigmeme.command.message("Anti-bodyblock enabled: " + enabled);
  });

  bigmeme.hook("S_PARTY_INFO", 1, evt => { Object.assign(cache, evt); });
  bigmeme.hook("S_PARTY_MEMBER_LIST", 7, evt => {
    partyMembers.clear();
    for (let i = 0, arr = evt.members, len = arr.length; i < len; ++i) {
      const member = arr[i];
      if (!member.online) continue;
      partyMembers.add(member.gameId);
    }
  });
};
