using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using Microsoft.AspNet.SignalR;

namespace Progress_Bars
{
    public class ProgressBars : Hub

    {
        private static int connectedClients = 0;
        private static bool loop = false;
    
        public void Hello()
        {
            Clients.All.hello();
        }

        public override Task OnConnected()
        {
            connectedClients++;

            Clients.All.updateConnections(connectedClients);

            return base.OnConnected();
        }

        public override Task OnDisconnected()
        {
            connectedClients--;

            Clients.All.updateConnections(connectedClients);
            
            return base.OnDisconnected();
        }

        public void StartProgressBars()
        {
            Random r = new Random();
            string a, b, c, d;
            loop = true;

            while (loop)
            {
                System.Threading.Thread.Sleep(1200);

                a = r.Next(0, 100).ToString();
                b = r.Next(0, 100).ToString();
                c = r.Next(0, 100).ToString();
                d = r.Next(0, 100).ToString();

                Clients.Caller.startProgressBars(a, b, c, d);
            }
        }
    }
}