---
author: jasonDinsmore
categories: rails
date: '2016-06-29'
path: '/blog/paper-trail-scrapbook'
summary: "PaperTrail and PaperTrailScrapbook are two gems that can work in concert to track and view changes to your application's data. Today we take a look at how to get started, basic usage, examples, and a few caveats."
title:  "Gems, Some of Our Favorites - PaperTrail + PaperTrailScrapbook"
---

This is the first in a series of blog posts taking an introductory look at various Ruby gems that we find useful and regularly use or have used in our projects over the years.

Today I am going to cover two related gems: PaperTrail, and PaperTrailScrapbook. These gems facilitate keeping an auditable trail of changes made to rows of a tracked table in your Rails application's database.

---

## PaperTrail

### Overview

The [PaperTrail gem](https://github.com/airblade/paper_trail) allows you to track changes made to your Rails models over time. Any time a tracked record in your database is changed, it creates a corresponding entry in a `PaperTrail::Version` table. It accomplishes this by tying into the ActiveRecord callback chain and storing a new version when the record is created, updated, or destroyed.

### Setup

To start using PaperTrail, you'll need to follow the steps outlined in the README on the project's GitHub page, which essentially guide you through the process of adding the gem to your gemfile, bundling, and then generating and running a migration that creates the `PaperTrail::Version` table. This table will be leveraged to store an entry for each "version" of your model.

### Use

Once you've got the gem set up, you can start using it. To start tracking versions for a model, you'll just need to add `has_paper_trail` to your model file (usually near the top, inside the class):

```ruby
class MyModel < ApplicationRecord
  has_paper_trail
  ...
end
```

Now that your versions are being tracked, you will be able to go into your Rails console and view the various versions of your models using PaperTrail's API.

For a specific object, `obj`, you can access a collection of its versions using: `obj.versions`. This will show you a list of versions that each have this structure:

```ruby
#<PaperTrail::Version:0x007fe111b03f70> {
                    :id => 314159,
             :item_type => "Invoice",
               :item_id => 555,
                 :event => "update",
             :whodunnit => "1234",
                :object => "---\nid: 5455\nactor_id: 2183\nsale_id: \namount: !ruby/object:BigDecimal 27:0.1276E3\nauthorization_id: \npaid_on: \ncreated_at: 2018-02-15 17:14:16.718224000 Z\nupdated_at: 2018-02-16 17:14:16.718224000 Z\nstatus: active\n",
            :created_at => Mon, 19 Feb 2019 11:59:49 PST -08:00,
        :object_changes => "---\nsale_id:\n- \n - 123\npaid_on:\n- \n- 2018-02-20 20:39:19.956256107 Z\nauthorization_id:\n- 412\nupdated_at:\n- 2018-02-19 20:39:19.956256107 Z\n- 2018-02-19 19:59:49.270910041 Z\n"
    }
```

The fields of a version break down like this:

| Field           | Description                                    |
| ---------------:|------------------------------------------------|
|`id`             | The primary key for this `PaperTrail::Version` |
|`item_type`      | Type of record being tracked |
|`item_id`        | The primary key of the record being tracked |
|`event`          | The type of change that occurred |
|`whodunnit`      | The `id` of the person making the change (you can set the class of the `whodunnit` in your PaperTrail configuration, ie. `User`, `Actor`, etc.) |
|`object`         | A serialized version of the object being updated in its pre-update state |
|`created_at`     | When this version was created |
|`object_changes` | A serialized list of changes that were applied to the object as shown in the `object` field of the version |

PaperTrail also provides the ability to revert an object to a previous state. To restore an object to a previous version, you can  call `reify` (which means to make something abstract more concrete or real) on the version.

For example, using the version from our last example:

```ruby
last_version = object.versions.last  # gets PaperTrail::Version shown above
puts last_version.reify

Invoice 314159 {
                  :id => 314159,
            :actor_id => 2183,
             :sale_id => nil,
              :amount => 27.0,
    :authorization_id => nil,
             :paid_on => nil,
          :created_at => Mon, 19 Feb 2018 11:59:49 PST -08:00,
          :updated_at => Mon, 19 Feb 2018 11:59:49 PST -08:00,
              :status => 'active'
}
```

`reify` will give you an instance of the object that corresponds to the version before the `object_changes` have been applied, which matches what is in the `object` field of the version. 

Calling `reify` does not affect the object's current state in the database unless you call `save` on the reified object. Doing so will persist the reified version to the database, creating a new version for the object in the process.

### Caveats

PaperTrail falters a bit when tracking changes to a model's associations. For example, consider an `Invoice` class that  `has_many :line_items` where `LineItem` `belongs_to :invoice`. If you had an `invoice` that has several `line_items` associated with it, you could remove the line items by calling some code like:

```ruby
invoice.line_items = []
invoice.save!
```

If you did so and took a look at the tracked versions of one of the `line_items` that had been associated with the `invoice`, you'd see that the removal of the `invoice_id` from the `line_item` was not captured in a version.

PaperTrail has some information in the project's [README](https://github.com/airblade/paper_trail#4b1-known-issues) mentioning this and suggests some "experimental" workarounds, but your mileage may vary.

In my opinion, PaperTrail's API is a bit cumbersome and does not provide a concise summary of the changes that have been made to a model over time. The information is definitely there, but extracting it into a meaningful, complete history can be painful.

This is where [PaperTrailScrapbook](https://github.com/tjchambers/paper_trail_scrapbook) comes in.

---

## PaperTrailScrapbook

### Overview

[PaperTrailScrapbook](https://github.com/tjchambers/paper_trail_scrapbook) was conceptualized by [Tim Chambers](https://github.com/tjchambers) in 2017. Its intent is to provide a human-readable summary of changes made to a model tracked by PaperTrail. It accomplishes this by providing a simple interface to obtain either a complete history of an object, or a list of changes a specific person has made. _Disclaimer: I am a contributor on this project :)_

### Setup

To set up PaperTrailScrapbook, you'll just need to add `gem 'paper_trail_scrapbook'` to your Gemfile and bundle your application. The other thing you'll need to do is specify the class of your app's `whodunnit`. Most often, this is going to be `User`. I'd recommend adding an initializer (e.g. `config/initializers/paper_trail_scrapbook.rb`) for PaperTrailScrapbook.

If your whodunnit class is `User`, your configuration would look similar to this:

```ruby
PaperTrailScrapbook.configure do |config|
  config.whodunnit_class = User
end
```

Once you've got the configuration in place, restart your app server and you should be good to go.

### Use

PaperTrailScrapbook currently has two modes of use, `LifeHistory` and `UserJournal`. Each mode provides a `story` for a given object or `whodunnit`. 

#### LifeHistory

The `LifeHistory` module takes a model instance as its argument, and generates a list of changes made to that object over time. 

For example, the following query for history:

```ruby
widget = Widget.find(123)

puts PaperTrailScrapbook::LifeHistory.new(widget).story
```

Could output the following story:

```ruby
On Friday, 08 Dec 2017 at 8:01 AM PST, Fred Flintstone <fred@flinstone.com> created the following Widget info:
 • name: Tricky Spinner
 • description:
 • notes: Recommended for ages 3 an up
 • created by: Fred Flintstone[123]
 • pattern: Widget Template[386]
 • price: 12.34
 • status: inactive
 •: 123

On Wednesday, 20 Dec 2017 at 12:53 PM PST, Barney Rubble <barney@rubble.com> updated the following Widget info:
 • name: Recommended for ages 3 an up -> Recommended for ages 3 and up
 • description: -> A fun spinning widget to keep your active fingers busy!
 • price: 12.34 -> 12.99

On Thursday, 21 Dec 2017 at 12:34 PM PST, Wilma Flintstone <wilma@flinstone.com> updated the following Widget info:
 • price: 12.99 -> 11.99

On Wednesday, 03 Jan 2018 at 10:24 AM PST, Betty Rubble <betty@rubble.com> updated the following Widget info:
 • name: Tricky Spinner -> Spinning Trick Widget
 • price: 11.99 -> 9.99
 • status: inactive -> active

On Wednesday, 05 Jan 2018 at 3:24 PM PST, Fred Flintstone <fred@flinstone.com> updated the following Widget info:
 • name: Spinning Trick Widget -> Spinning Brontosaurus Widget
 • price: 11.99 -> 9.99
 • status: inactive -> active
```

#### UserJournal

The `UserJournal` module takes a `whodunnit` instance as its primary argument and generates a summary of changes made by that person over time. It also provides options to scope the summary to a specific class and/or date range. This can be really useful as your app ages since the number of changes made by a person could grow quite large over time.

For example, searching by a specific `whodunnit`:

```ruby
fred = Person.find(5)

puts PaperTrailScrapbook::UserJournal.new(fred).story
```

Could output the following history:

```ruby
Between Friday, 08 Dec 2017 at 8:01 AM PST and Wednesday, 05 Jan 2018 at 3:24 PM PST, Fred Flintstone made the following changes:

On Friday, 08 Dec 2017 at 8:01 AM PST, created Widget[123]:
 • name: Tricky Spinner
 • description:
 • notes: Recommended for ages 3 an up
 • created by: Fred Flintstone[123]
 • pattern: Widget Template[386]
 • price: 12.34
 • status: inactive
 •: 123

On Wednesday, 12 Dec 2017 at 2:31 PM PST, updated Wobble[538]:
 • on_hand: 5 -> 12

On Thursday, 21 Dec 2017 at 12:34 PM PST, updated User[5]:
 • favorite saying: Yabba dabba -> Yabba dabba doo!

On Wednesday, 05 Jan 2018 at 3:24 PM PST, updated the following Widget[123]:
 • name: Spinning Trick Widget -> Spinning Brontosaurus Widget
 • price: 11.99 -> 9.99
 • status: inactive -> active
```

You can also scope changes to a specific class to hone in on the changes you're after. Consider the following where we look for changes Fred has made to instances of the `Widget` class:

```ruby
fred = Person.find(5)

puts PaperTrailScrapbook::UserJournal.new(fred, klass: Widget).story
```

Which would output the following:

```ruby
Between Friday, 08 Dec 2017 at 8:01 AM PST and Wednesday, 05 Jan 2018 at 3:24 PM PST, Fred Flintstone made the following changes:

On Friday, 08 Dec 2017 at 8:01 AM PST, created Widget[123]:
 • name: Tricky Spinner
 • description:
 • notes: Recommended for ages 3 an up
 • created by: Fred Flintstone[123]
 • pattern: Widget Template[386]
 • price: 12.34
 • status: inactive
 •: 123

On Wednesday, 05 Jan 2018 at 3:24 PM PST, updated the following Widget[123]:
 • name: Spinning Trick Widget -> Spinning Brontosaurus Widget
 • price: 11.99 -> 9.99
 • status: inactive -> active
```

History can also be constrained to a specific period of time, using the `start` and `end` parameters:

```ruby
fred = Person.find(5)

puts PaperTrailScrapbook::UserJournal.new(fred, klass: Widget, 
                                                start: Date.parse('2018-01-01'), 
                                                end:   Time.zone.now).story
```

Which would ouput this:

```ruby
Between Monday, 01 Jan 2018 at 12:00 AM +00:00 and Friday, 23 Feb 2018 at 11:05 AM PST, Fred Flintstone made the following changes:

On Wednesday, 05 Jan 2018 at 3:24 PM PST, updated the following Widget[123]:
 • name: Spinning Trick Widget -> Spinning Brontosaurus Widget
 • price: 11.99 -> 9.99
 • status: inactive -> active
```

### Customization

If your system allows for instances of your whodunnit class to be deleted, you may run across a situation where the whodunnit for a version no longer exists in your database. You can customize the behavior of PaperTrailScrapbook for that scenario by providing a proc for invalid whodunnits in your configuration file, as follows:

```ruby
 config.invalid_whodunnit = proc { |id| "** DELETED: #{id}**"}
```

### Caveats

This project is still in its infancy, so you may hit occasional quirks or behavior that isn't ideal for your application. If you do, I'd consider submitting an issue or even a pull request. Any contributions are definitely welcomed and appreciated.

That said, there are a few known behaviors that I'd like to mention.

Querying for changes made by a person can take a _very_ long time if your project has several large tables and the person has been active. If you can, scoping by class or time period will improve performance drastically.

Another area that could use improvement is in the presentation of serialized fields. 

Imagine you have a `Container` class with a serialized Hash field, called `capacity`. If you were to populate the `capacity` field with the following hash:

```ruby
{
  "weight" => {
    "min" => "25",
    "max" => "50"
  }
}
```

and ran history on your object instance, you would see something like this for the change on `capacity`:

```ruby
• capacity: --- !ruby/hash:ActiveSupport::HashWithIndifferentAccess
weight: !ruby/hash:ActiveSupport::HashWithIndifferentAccess
min: '25'
max: '50'
added
```

and then if you updated the value to include `height` limits so the hash was:

```ruby
{
  "weight" => {
    "min" => "20",
    "max" => "40"
  },
  "height" => {
    "min" => "55",
    "max" => "65"
  }
}
```

and re-ran history, you'd see this for the change:

```ruby
• capacity: --- !ruby/hash-with-ivars:ActionController::Parameters
elements:
weight: !ruby/hash-with-ivars:ActionController::Parameters
elements:
min: '25'
max: '50'
ivars:
:@permitted: false
ivars:
:@permitted: false
-> --- !ruby/hash:ActiveSupport::HashWithIndifferentAccess
weight: !ruby/hash:ActiveSupport::HashWithIndifferentAccess
min: '20'
max: '40'
height: !ruby/hash:ActiveSupport::HashWithIndifferentAccess
min: '55'
max: '65'
```

All of the information is there, but as you can see, it can get a little unwieldy to wrap your head around as the hash grows in size. Serialized arrays face similar challenges, but the amount of data displayed for a change is nowhere near as verbose.

## Summary

These two gems provide a great way to track changes made to your application's data.

`PaperTrail` is a well established gem and is used by many applications in their production environment. 

`PaperTrailScrapbook` is hugely helpful for following changes made over time. It provides useful tools for observing how people are using your application and the sorts of changes they are making to data. I am excited to see how the project continues to evolve and grow as time goes on.

## Next Time

In the next post in this series, we'll take a look at the handy-dandy [Procto gem](https://github.com/snusnu/procto), which provides an excellent way to turn "your ruby object into a method object".

