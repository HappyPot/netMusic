$(function(){
		//播放按钮与暂停按钮的切换
		/*var time=null;
		var minutes=null;
		var rts=null;*/
		var video=$("video").get(0);
		var timeD=null;
		$('.play').click(function(e){
			e.preventDefault();
				if (video.paused) {
					video.play();
					$('.play').addClass('stop');
				}else{
					video.pause();
					$('.play').removeClass('stop');
				}
		})
		//播放器进度条
		$('video').on('loadedmetadata',function(){
			timeD=getMusicTime();
			$('#alltime').text(timeD);
			/*time=video.duration;
			minutes=parseInt(time/60);
			rts=parseInt(time-minutes*60);
			if (rts<10) {
				$('#alltime').text('0'+minutes+":"+'0'+rts);
			}else{
				$('#alltime').text('0'+minutes+":"+rts);
			}*/
			
			$('.time input').get(0).min=0;
			$('.time input').get(0).max=time;
		})
		//进度按钮移动
		var curr;
		$('video').on('timeupdate',function(){
			curr=video.currentTime;//音频当前播放时间
			
			$('.time input:eq(0)').val(curr);
			if (curr<59) {
				$('#minu').text('0'+'0');
				if(parseInt(curr)<10){
						$("#sec").text("0"+parseInt(curr));
					}else{
						$("#sec").text(parseInt(curr));
					}
			}else{
				$("#minu").text("0"+parseInt(curr/60));
				var s=parseInt(curr-parseInt(curr/60)*60);
				if(s<10){
						$("#sec").text("0"+s);
					}else{
						$("#sec").text(s);
					}
			}
			if (curr==time) {
				$('.play').removeClass('stop');         
			}
		})
		//拖动滑块
		$('.time input:eq(0)').on('input',function(){
			var s=$(this).val();
			curr=s;
		})
/////////////////////////////////////////////////////////////////////////////////////////////////
		//我喜欢的歌单滑动
		$('.slide_like').click(function(){
			$('.collect_like').slideToggle("slow");
		})
		//收藏歌单滑动
		$('.slide_list').click(function(){
			$('.collect_list').slideToggle("slow");
		})
		//我的音乐
		$('.slide_music_list').click(function(){
			$('.my_music_list').slideToggle("slow");
		})
		//隐藏音乐定位块
		$('#music_name').on('dblclick',function(){
			$(this).css('display','none');
		})
		//静音
		$('.horn').click(function(){
			if(video.muted==false){
					video.muted=true;
				}else{
					video.muted=false;
				}
		})
		/*选择歌曲*/
		$('#list_main ul').on('click','li',function(){
			var a=$(this).find('.title_music').text();
			video.src="music/"+a+".mp3";
			video.play();
			$('.play').addClass('stop');
			$('#list_main ul li').removeClass("this_Color");
			$(this).addClass("this_Color");
			/*alert(a);*/
			/*var alltime=$('#alltime').text();
			$('#alltime').text('');*/
			$(this).find(".duration").text(timeD);
			
		})
		/*下一首*/
		var flag=true;
		$(".next_music").click(function(e){
			e.preventDefault();
			var list_li = $('#list_main ul li');
			/*alert(list_li.find('.title_music').eq(2).text());*/
			for (var i=1;i<=list_li.length;i++) {
				if (list_li.eq(i).hasClass("this_Color")) {
					list_li.eq(i).removeClass("this_Color");
					if(i==list_li.length-1){//
							list_li.eq(1).addClass("this_Color");
							video.src="music/"+list_li.find('.title_music').eq(1).text()+".mp3";
							video.play();
							$('.play').addClass('stop');
						}else{
							
							list_li.eq(i).next().addClass("this_Color");//给第二个添加样式类。
							video.src="music/"+list_li.find('.title_music').eq(i+1).text()+".mp3";
							video.play();
							$('.play').addClass('stop');
						}	
					/*list_li.eq(i).next().addClass("this_Color");*/
					break;
				}else{
					if (flag) {
						list_li.eq(i).addClass("this_Color");
						video.src="music/"+list_li.find('.title_music').eq(1).text()+".mp3";
						video.play();
						$('.play').addClass('stop');
						flag=false;
					};
				};
			};
		});
		/*上一首*/
		$(".pre_music").click(function(){
			e.preventDefault();
			var list_li = $('#list_main ul li');   
			for (var i=list_li.length;i>=0;i--) {
				
			}
		})
		/*获得歌曲时间*/
		function getMusicTime(){
			time=video.duration;
			minutes=parseInt(time/60);
			rts=parseInt(time-minutes*60);
			if (rts<10) {
				var timeString=('0'+minutes+":"+'0'+rts);
				/*$('#alltime').text('0'+minutes+":"+'0'+rts);*/
			}else{
				var timeString=('0'+minutes+":"+rts);
				/*$('#alltime').text('0'+minutes+":"+rts);*/
			}
			return timeString;
		}
		/*弹出层*/
		$('#setting').click(function(event) {	
				event.preventDefault();
				//iframe形式加载其他网页内容
				var index =layer.open({
					title:"网易云音乐",
				    type: 2,				    
				    area: ['350px', '540px'], //宽高
				    skin: 'layui-layer-rim',
				    content: ["login.html","no"],
				    success: function(index){
				    	 layer.iframeAuto(index);
				    }
				});	
		});
})