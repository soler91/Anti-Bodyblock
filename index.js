const Command = require('command');

module.exports = function antibodyblock(dispatch) {
    const command = Command(dispatch);
    let partyMembers = [];
    let cache = {};

    command.add('bb', () => {
        RemoveBodyBlock();
        command.message("work?");
	});
    
    dispatch.hook('S_PARTY_INFO', 1, event => {
        cache = event;
    })
    
    dispatch.hook('S_PARTY_MEMBER_LIST', 5, (event) => {
        partyMembers = [];
            for (let i in event.members) {
                if (event.members[i].online) {
                    partyMembers.push({
                        cid: event.members[i].cid
                    });
                }
            }
    });
    
    function RemoveBodyBlock(){
        if(partyMembers){
            for(let i in partyMembers){
                dispatch.toClient('S_PARTY_INFO', 1, {
                        leader: partyMembers[i].cid,
                        unk1: cache.unk1,
                        unk2: cache.unk2,
                        unk3: cache.unk3,
                        unk4: 1
                })
            }
        }
    }
    
}