const dragbarleft = newg
  .append("rect")
  .attr("x", d => {
    return d.x - dragbarw / 2;
  })
  .attr("y", d => {
    return d.y + dragbarw / 2;
  })
  .attr("height", height - dragbarw)
  .attr("id", "dragleft")
  .attr("width", dragbarw)
  .attr("fill", "lightblue")
  .attr("fill-opacity", 0.5)
  .attr("cursor", "ew-resize")
  .call(dragleft);

const dragbarright = newg
  .append("rect")
  .attr("x", d => {
    return d.x + width - dragbarw / 2;
  })
  .attr("y", d => {
    return d.y + dragbarw / 2;
  })
  .attr("id", "dragright")
  .attr("height", height - dragbarw)
  .attr("width", dragbarw)
  .attr("fill", "lightblue")
  .attr("fill-opacity", 0.5)
  .attr("cursor", "ew-resize")
  .call(dragright);

const dragbartop = newg
  .append("rect")
  .attr("x", d => {
    return d.x + dragbarw / 2;
  })
  .attr("y", d => {
    return d.y - dragbarw / 2;
  })
  .attr("height", dragbarw)
  .attr("id", "dragleft")
  .attr("width", width - dragbarw)
  .attr("fill", "lightgreen")
  .attr("fill-opacity", 0.5)
  .attr("cursor", "ns-resize")
  .call(dragtop);

const dragbarbottom = newg
  .append("rect")
  .attr("x", d => {
    return d.x + dragbarw / 2;
  })
  .attr("y", d => {
    return d.y + height - dragbarw / 2;
  })
  .attr("id", "dragright")
  .attr("height", dragbarw)
  .attr("width", width - dragbarw)
  .attr("fill", "lightgreen")
  .attr("fill-opacity", 0.5)
  .attr("cursor", "ns-resize")
  .call(dragbottom);

const dragmove = d => {
  if (isXChecked) {
    dragrect.attr("x", (d.x = Math.max(0, Math.min(w - width, d3.event.x))));
    dragbarleft.attr("x", d => {
      return d.x - dragbarw / 2;
    });
    dragbarright.attr("x", d => {
      return d.x + width - dragbarw / 2;
    });
    dragbartop.attr("x", d => {
      return d.x + dragbarw / 2;
    });
    dragbarbottom.attr("x", d => {
      return d.x + dragbarw / 2;
    });
  }
  if (isYChecked) {
    dragrect.attr("y", (d.y = Math.max(0, Math.min(h - height, d3.event.y))));
    dragbarleft.attr("y", d => {
      return d.y + dragbarw / 2;
    });
    dragbarright.attr("y", d => {
      return d.y + dragbarw / 2;
    });
    dragbartop.attr("y", d => {
      return d.y - dragbarw / 2;
    });
    dragbarbottom.attr("y", d => {
      return d.y + height - dragbarw / 2;
    });
  }
}

const ldragresize = d => {
  if (isXChecked) {
    const oldx = d.x;
    //Max x on the right is x + width - dragbarw
    //Max x on the left is 0 - (dragbarw/2)
    d.x = Math.max(0, Math.min(d.x + width - dragbarw / 2, d3.event.x));
    width = width + (oldx - d.x);
    dragbarleft.attr("x", d => {
      return d.x - dragbarw / 2;
    });
    dragrect
      .attr("x", d => {
        return d.x;
      })
      .attr("width", width);
    dragbartop
      .attr("x", d => {
        return d.x + dragbarw / 2;
      })
      .attr("width", width - dragbarw);
    dragbarbottom
      .attr("x", d => {
        return d.x + dragbarw / 2;
      })
      .attr("width", width - dragbarw);
  }
}

const rdragresize = d => {
  if (isXChecked) {
    //Max x on the left is x - width
    //Max x on the right is width of screen + (dragbarw/2)
    const dragx = Math.max(
      d.x + dragbarw / 2,
      Math.min(w, d.x + width + d3.event.dx)
    );
    //recalculate width
    width = dragx - d.x;
    //move the right drag handle
    dragbarright.attr("x", d => {
      return dragx - dragbarw / 2;
    });
    //resize the drag rectangle
    //as we are only resizing from the right, the x coordinate does not need to change
    dragrect.attr("width", width);
    dragbartop.attr("width", width - dragbarw);
    dragbarbottom.attr("width", width - dragbarw);
  }
}

const tdragresize = d => {
  if (isYChecked) {
    const oldy = d.y;
    //Max x on the right is x + width - dragbarw
    //Max x on the left is 0 - (dragbarw/2)
    d.y = Math.max(0, Math.min(d.y + height - dragbarw / 2, d3.event.y));
    height = height + (oldy - d.y);
    dragbartop.attr("y", d => {
      return d.y - dragbarw / 2;
    });

    dragrect
      .attr("y", d => {
        return d.y;
      })
      .attr("height", height);

    dragbarleft
      .attr("y", d => {
        return d.y + dragbarw / 2;
      })
      .attr("height", height - dragbarw);
    dragbarright
      .attr("y", d => {
        return d.y + dragbarw / 2;
      })
      .attr("height", height - dragbarw);
  }
}

const bdragresize = d => {
  if (isYChecked) {
    //Max x on the left is x - width
    //Max x on the right is width of screen + (dragbarw/2)
    const dragy = Math.max(
      d.y + dragbarw / 2,
      Math.min(h, d.y + height + d3.event.dy)
    );

    //recalculate width
    height = dragy - d.y;

    //move the right drag handle
    dragbarbottom.attr("y", d => {
      return dragy - dragbarw / 2;
    });

    //resize the drag rectangle
    //as we are only resizing from the right, the x coordinate does not need to change
    dragrect.attr("height", height);
    dragbarleft.attr("height", height - dragbarw);
    dragbarright.attr("height", height - dragbarw);
  }
}
