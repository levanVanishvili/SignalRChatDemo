using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SignalRChatDemo
{
    public class ChatHub: Hub
    {
        // receives some sent message as a parameter and then with await call Clients.All.SendAsync ("Send", message, userName) relay this message to all connected clients.
        public async Task Send(string message, string userName)
        {
            await this.Clients.All.SendAsync("Send", message, userName);
        }
    }
}
