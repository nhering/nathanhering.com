using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace Slot_Machine
{
    public partial class SlotMachine : System.Web.UI.Page
    {
        Random random = new Random();
        
        //Initialize the game
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!Page.IsPostBack)
            {
                string[] reels = new string[] { spinReel(), spinReel(), spinReel() };
                displayReels(reels);
                ViewState.Add("purse", 100);
                displayPurse();
            }
        }

        //Input phase
        protected void PlayButton_Click(object sender, EventArgs e)
        {
            int bet = 0;
            if (!int.TryParse(BetInput.Text, out bet))
            {
                ResultLabel.Text = "You must place a valid bet.";
            }
            else
            {
                validateBet(bet);
            }
        }

        private void validateBet(int bet)
        {
            int purse = int.Parse(ViewState["purse"].ToString());
            if (bet > purse)
            {
                ResultLabel.Text = "You don't have enough to place that bet.";
            }
            else if (bet == 0)
            {
                ResultLabel.Text = "Zero will get you nothing.";
            }
            else play(bet);
        }

        private void play(int bet)
        {
            int winnings = pullLever(bet);
            displayResult(bet, winnings);
            adjustPurse(bet, winnings);
            displayPurse();
        }

        //Update phase
        private void adjustPurse(int bet, int winnings)
        {
            int purse = int.Parse(ViewState["purse"].ToString());
            purse -= bet;
            purse += winnings;
            ViewState["purse"] = purse;
        }

        private int pullLever(int bet)
        {
            string[] reels = new string[] { spinReel(), spinReel(), spinReel() };
            displayReels(reels);
            int multiplier = evaluateSpin(reels);
            return bet * multiplier;
        }

        private int evaluateSpin(string[] reels)
        {
            if (isBar(reels)) return 0;
            if (isJackpot(reels)) return 100;
            int multiplier = 0;
            if (isWinner(reels, out multiplier)) return multiplier;
            return 0;
        }

        private bool isBar(string[] reels)
        {
            if (reels[0] == "Bar" || reels[1] == "Bar" || reels[2] == "Bar") return true;
            else return false;
        }

        private bool isJackpot(string[] reels)
        {
            if (reels[0] == "Seven" && reels[1] == "Seven" && reels[2] == "Seven") return true;
            else return false;
        }

        private bool isWinner(string[] reels, out int multiplier)
        {
            multiplier = determineMultiplier(reels);
            if (multiplier > 0) return true;
            return false;
        }

        private int determineMultiplier(string[] reels)
        {
            int count = determineCherryCount(reels);
            int[] multiplierArray = new int[] { 0, 2, 3, 4 };
            return multiplierArray[count];
        }

        private int determineCherryCount(string[] reels)
        {
            int count = 0;
            foreach (var item in reels)
            { if (item == "Cherry") count++; }
            return count;
        }

        private string spinReel()
        {
            string[] images = new string[] { "Bar", "Bell", "Cherry", "Clover", "Diamond", "HorseShoe", "Lemon", "Orange", "Plum", "Seven", "Strawberry", "Watermellon" };
            return images[random.Next(11)];
        }

        //Display phase
        private void displayReels(string[] reels)
        {
            Reel1.ImageUrl = "~/Areas/SlotMachine/Images/" + reels[0] + ".png";
            Reel2.ImageUrl = "~/Areas/SlotMachine/Images/" + reels[1] + ".png";
            Reel3.ImageUrl = "~/Areas/SlotMachine/Images/" + reels[2] + ".png";
        }

        private void displayResult(int bet, int winnings)
        {
            if (winnings > 0)
            {
                ResultLabel.Text = String.Format("You won {0:C}", winnings);
            }
            else
            {
                ResultLabel.Text = String.Format("You lost {0:C}", bet);
            }
        }

        private void displayPurse()
        {
            MoneyLabel.Text = String.Format("Your money: {0:C}", ViewState["purse"]);
        }
    }
}