/**
 * 外观模式
 * 解释器模式
 * 访问模式
 */

/**
 * 外观模式（Facade）：
 * 为子系统中的一组接口提供一个高层接口
 * 使用者使用这个高层接口
 *
 * 在实际的业务中使用的比较多，实际框架中其实可以不去考虑。
 *
 * 不符合单一职责原则和开闭原则，谨慎使用，不滥用
 */

function bindEvent(elem, type, selector, fn) {
  if (fn == null) {
    fn = selector;
    selector = null;
  }

  // ******
}

bindEvent(elem, "click", "#div1", fn);
bindEvent(elem, "click", fn);

/**
 * 解释器模式
 *
 * 描述语言语法如何定义，如何解释和编译
 */

/**
 * 访问模式
 *
 * 将数据操作和数据结构分离
 */
