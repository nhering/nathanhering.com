﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace NathanHering.Controllers
{
    public class GameController : Controller
    {
        public ActionResult Pong()
        {
            return View();
        }
        public ActionResult Breakout()
        {
            return View();
        }
    }
}