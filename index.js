const Command = require('command');

module.exports = function antibodyblock(dispatch) {
    const command = Command(dispatch);
    let partyMembers = [];
    let cache = {};
    let interval = null;
    let enabled = false;

    command.add('bb', () => {
        enabled = !enabled;
        if(enabled){
            interval = setInterval(RemoveBodyBlock,5000);
        }
        else if(!enabled){
            clearInterval(interval);
        }
        command.message("Anti-bodyblock enabled: "+enabled);
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
