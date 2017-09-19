---
layout: post
title: Building Android Oreo
categories: technology
---

I'm no Android developer, but since I bought my first Android device, a Motorola Atrix 4G, I've always enjoyed customizing my phones and tablets with aftermarket ROMs, kernels, and themes. To this day, I'm partial to devices that are friendly to custom software, such as Google's Nexus line and OnePlus's phones. I love installing custom ROMs on my phone for a number of reasons: removing bloat, new features, beautiful themes, and fast updates.

That last one is particularly important to me. I'm impatient, and it bugs me when I'm not running the latest version of something. So when Google released [Android 8.0 "Oreo"](https://www.android.com/versions/oreo-8-0/) on August 21, I was excited. I currently use a Nexus 6P as my phone, which meant that I was first in line to get the update. People with phones that aren't from the Nexus/Pixel line will [probably have to wait months](http://www.androidauthority.com/android-8-0-update-784308/) to get the update, if they ever do. As soon as Google dropped the factory images for its Nexus phones, I downloaded it and flashed it via fastboot. Now my phone was running a shiny new version of Android Oreo.

The problem, of course, was that stock Android (which is how the Android community refers to the unvarnished version of Android released by Google, unmodified by any third party) lacks most of the features I've come to know and love through well-developed custom ROMs. I did have theming, thanks to the incredible [Substratum](https://plus.google.com/communities/102261717366580091389) project, but most of the other tweaks I'd become accustomed to on Nougat were unavailable. The developers of my favorite custom ROMs&mdash;such as [Dirty Unicorns](https://dirtyunicorns.com/) and [PureNexus](https://plus.google.com/communities/103055954354785266764)&mdash; are hard at work getting Oreo versions ready, but it takes a lot of work, and they have pretty high standards for what they release. All that development and testing takes time.

And unfortunately, I'm just not that patient. You don't have to be a developer to build a ROM from someone else's source code, a lesson I learned around this time last year, when Google released Nougat. Thankfully, there'a developer who goes by the handle [ezio84](https://forum.xda-developers.com/member.php?u=2095315) works on a ROM through the [Android Builders' Collective](https://forum.xda-developers.com/custom-roms/android-builders-collective/rom-builders-collective-t2861778) at XDA Developers. He makes his [source code](https://github.com/ezio84) freely available for anyone to build.

### Set Up Your Build Environment

The first thing you need to build an Android ROM is a computer running Linux with a lot of free space, a fast processor, and a lot of memory ([Google recommends](https://source.android.com/source/requirements) 250 GB of hard drive space and 16 GB of memory). Even if your computer meets those standards, you probably won't really be able to use your computer while it's building, as the build will take up most of your processing power. I don't have a spare machine lying around, so I used an [Amazon EC2 instance](https://aws.amazon.com/ec2/). You could also use similar products from a number of companies, including Digital Ocean. Note that you'll probably need more power, RAM, and space than these companies offer through their free products, so you'll likely have to shell out a little money.

Now, boot into Linux and set up your build environment. There are a couple of ways to do that, and you can [read about the details here](https://raw.githubusercontent.com/nathanchance/Android-Tools/master/Guides/Building_AOSP.txt). The easiest way is to download a script that will do the heavy lifting for you. These commands are set up for Debian-based Linux distros, like Ubuntu:

```
$ sudo apt-get install git-core
$ git clone https://github.com/akhilnarang/scripts
$ cd scripts
$ ls
```

That last command will list all the scripts available. Run the one for your distro like this:

```
$ bash setup/<script-name>
```

Now we need to set up git:
```
$ git config --global user.name "Your Name"
$ git config --global user.email "you@example.com"
```

### Get the Source

Finally, we're ready to download the Android source code. Make a new folder on your build machine for the ROM you're building. Then initialize the repository for your source code:

```
$ repo init -u ssh://git@github.com/[Project]/[Manifest].git -b [Branch]
```

You'll obviously need to replace [Project] with the GitHub user name of the project you want, [Manifest] with the name of the manifest repository on Github, and [Branch] with the correct branch. Now you're ready to sync the repository and download all of the source code:

```
$ repo sync --force-sync
```

This step will take a while, as you have download tens of gigabytes of source code.

### Build the ROM

If you have an extra 50 GB or so of disk space, you may want to set up ccache, a caching system that will really speed up builds after your initial build. You do this like so:

```
$ nano ~/.bashrc
- Append export USE_CCACHE=1 to the end of this file
   then hit ctrl-X, Y, and enter.
$ source ~/.bashrc

```

This next part can vary a little depending on how the maintainers of your ROM have set things up, but typically you'll run the following three commands:

```
$ . build/envsetup.sh
$ breakfast [Device]
$ mka bacon
```

The [Device] should be the codename for your device; for example, my Nexus 6P is **angler**. Now, sit back and wait. Building will take a while&mdash;possibly a couple of hours&mdash;depending on how fast your build box is and how much memory it has. Once it's done, it'll produce a flashable zip you can put on your device. You just need to copy it over from your build box, and you're ready to go.
