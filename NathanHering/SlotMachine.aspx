<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="SlotMachine.aspx.cs" Inherits="Slot_Machine.SlotMachine" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
</head>
<body>
    <form id="form1" runat="server">
    <div>
    
        <asp:Image ID="Reel1" runat="server" Height="150px" Width="150px" />
        <asp:Image ID="Reel2" runat="server" Height="150px" Width="150px" />
        <asp:Image ID="Reel3" runat="server" Height="150px" Width="150px" />
        <br />
        <br />
        Your Bet:
        <asp:TextBox ID="BetInput" runat="server" Width="75px"></asp:TextBox>
        <br />
        <br />
        <asp:Button ID="PlayButton" runat="server" OnClick="PlayButton_Click" Text="Play" Width="150px" />
        <br />
        <br />
        <asp:Label ID="ResultLabel" runat="server"></asp:Label>
        <br />
        <br />
        <asp:Label ID="MoneyLabel" runat="server" Text="$100"></asp:Label>
        <br />
        <br />
        Odds<br />
        One Cherry = 2x your bet<br />
        Two Cherries = 3x your bet<br />
        Three Cherries = 4x your bet<br />
        Three Sevens = Jackpot!, 100x your bet<br />
        However, even just one bar and you loose your bet.</div>
    </form>
</body>
</html>
