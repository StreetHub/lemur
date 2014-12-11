import Ember from 'ember';

export default Ember.Component.extend({

    generateGrid: function() {
        Ember.$(document).ready(function ($) {

            var $posts = $('.posts');
            var $post = $('.post');
            var $image = $('.post img');
            var viewport = {
                width  : $(window).width()
            };

            $posts.addClass('loading');

            $.each($image, function() {
                var image_height = $(this).attr('height');
                $(this).css('height', image_height);
            });

            function gridify(space) {
                var column = (space / 2);
                var blocs_count = $post.size();
                var grid = new Array();
                grid[0] = 0;
                grid[1] = 0;

                $post.css('position', 'absolute');

                $.each($post, function() {
                    var lowest = Math.min.apply(null, grid);
                    var lowest_index = grid.indexOf(lowest);
                    var height = $(this).outerHeight() + 40;
                    grid[lowest_index] += height;
                    var x = (lowest_index * column) + 60;
                    var y = lowest;
                    $(this).css('left', x);
                    $(this).css('top', y);
                });

                var biggest = Math.max.apply(null, grid);
                var h = biggest - 40;

                $posts.addClass('wall');
                $posts.css('height', h + 'px');
            }

            function resetify() {
                $posts.removeClass('wall');
                $posts.css('height', 'auto');
                $post.css('left', 0);
                $post.css('position', 'relative');
                $post.css('top', 0);
            }

            function wallify(size){
                if (size >= 960) {
                    gridify(960);
                } else {
                    resetify();
                }
            }

            wallify(viewport.width);

            $posts.removeClass('loading');

            var resize_timer;
            $(window).resize(function() {
                var new_viewport = {
                    new_width  : $(window).width()
                };
                clearTimeout(resize_timer);
                resize_timer = setTimeout(wallify(new_viewport.new_width), 100);
            });

});
    }.on('didInsertElement')
});
